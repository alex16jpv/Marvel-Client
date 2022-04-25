import React, { useEffect, useState } from "react";
import {
  Dimmer,
  Loader,
  Card,
  Container,
  Pagination,
  Grid,
  Divider,
} from "semantic-ui-react";
import CharacterService from "../../services/characters.service";
import { reduceText } from "../../utils";

const Characters = () => {
  const [characters, setCharacters] = useState(undefined);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    offset: 0,
  });

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setCharacters(undefined);
        const service = new CharacterService();
        const { results, ...queryInfo } = await service.getCharacters(
          pagination
        );
        if (results.length > 0) {
          setCharacters(results);
          setPagination(queryInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCharacters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.offset]);

  const onPageChange = (e, { activePage }) => {
    console.log(activePage);
    setPagination({
      ...pagination,
      offset: pagination.limit * (activePage - 1),
    });
  };

  if (!characters) {
    return (
      <Dimmer active inverted>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  return (
    <>
      <Container>
        <Grid columns={4} doubling>
          {characters.map((character) => (
            <Grid.Column key={character.id}>
              <Card
                href={`/characters/${character.id}`}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                header={character.name}
                description={reduceText(character.description)}
              />
            </Grid.Column>
          ))}
        </Grid>

        <Divider />
      </Container>
      <Pagination
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        siblingRange={2}
        onPageChange={onPageChange}
        activePage={pagination.offset / pagination.limit + 1}
        totalPages={Math.ceil(pagination.total / pagination.limit)}
      />
    </>
  );
};

export default Characters;
