import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComicsService from "../../services/comics.service";
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
  const { id: comicId } = useParams();
  const [comic, setComic] = useState(undefined);

  useEffect(() => {
    const getComic = async () => {
      try {
        const service = new ComicsService();
        const { results } = await service.getComic(comicId);
        if (results.length > 0) {
          setComic(results[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getComic();
  }, [comicId]);

  if (!comic) {
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
        size="small"
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
      />
      <Header as="h1" icon textAlign="center">
        {comic.title}
      </Header>

      <Divider />

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Creators</Header>
            <List>
              {comic.creators.items.map((serie) => (
                <List.Item key={serie.resourceURI}>{serie.name}</List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Character;
