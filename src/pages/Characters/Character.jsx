import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterService from "../../services/characters.service";
import {
  Dimmer,
  Divider,
  Grid,
  Header,
  Item,
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
      <Item.Group>
        <Item>
          <Item.Image
            size="small"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />

          <Item.Content>
            <Header as="h1" color="red">
              {character.name}
            </Header>
            <Item.Description>{character.description}</Item.Description>
            <Item.Extra>
              Additional Details
              <List>
                <List.Item>Comics: {character.comics.available}</List.Item>
                <List.Item>Series: {character.series.available}</List.Item>
                <List.Item>Stories: {character.stories.available}</List.Item>
                <List.Item>Events: {character.events.available}</List.Item>
              </List>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      <Divider />

      <Grid columns={4} divided>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" color="red">
              Comics ({`${character.comics.available} Available`})
            </Header>
            <List bulleted>
              {character.comics.items.map((comic) => (
                <List.Item key={comic.resourceURI}>{comic.name}</List.Item>
              ))}
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as="h3" color="red">
              Series ({`${character.series.available} Available`})
            </Header>
            <List bulleted>
              {character.series.items.map((series) => (
                <List.Item key={series.resourceURI}>{series.name}</List.Item>
              ))}
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as="h3" color="red">
              Stories ({`${character.stories.available} Available`})
            </Header>
            <List bulleted>
              {character.stories.items.map((story) => (
                <List.Item key={story.resourceURI}>{story.name}</List.Item>
              ))}
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as="h3" color="red">
              Events ({`${character.events.available} Available`})
            </Header>
            <List bulleted>
              {character.events.items.map((event) => (
                <List.Item key={event.resourceURI}>{event.name}</List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Character;
