import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterService from "../../services/characters.service";
import {
  Dimmer,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Loader,
} from "semantic-ui-react";

const Character = () => {
  const { id: characterId } = useParams();
  const [character, setCharacter] = useState(undefined);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const service = new CharacterService();
        const { results } = await service.getCharacter(characterId);
        if (results.length > 0) {
          setCharacter(results[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCharacter();
  }, [characterId]);

  if (!character) {
    return (
      <Dimmer active inverted>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  return (
    <div>
      <Image
        centered
        circular
        size="small"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <Header as="h1" icon textAlign="center">
        {character.name}
      </Header>

      <Divider />

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Comics</Header>
            <List>
              {character.comics.items.map((comic) => (
                <List.Item key={comic.resourceURI}>{comic.name}</List.Item>
              ))}
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as="h3">Series</Header>
            Comming soon...
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Character;
