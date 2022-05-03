import React, { useEffect, useState } from "react";
import {
  Card,
  Dimmer,
  Divider,
  Grid,
  Input,
  Loader,
  Pagination,
} from "semantic-ui-react";
import ComicsService from "../../services/comics.service";

const Comics = () => {
  const [titleStartsWith, setTitleStartsWith] = useState(undefined);
  const [comics, setComics] = useState(undefined);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    offset: 0,
  });

  const getComics = async () => {
    const service = new ComicsService();
    const query = {
      ...pagination,
    };

    if (titleStartsWith) query.titleStartsWith = titleStartsWith;
    const { results, ...queryInfo } = await service.getComics(query);
    if (results.length > 0) {
      setPagination((prev) => ({ ...prev, ...queryInfo }));
      setComics(results);
    }
  };

  useEffect(() => {
    getComics();
  }, [pagination.offset, titleStartsWith]);

  const onPageChange = (_, { activePage }) => {
    setPagination({
      ...pagination,
      offset: pagination.limit * (activePage - 1),
    });
  };

  const onChange = async (e) => {
    const { value } = e.target;

    setTitleStartsWith(value);
  };

  if (!comics) {
    return (
      <Dimmer active inverted>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  return (
    <>
      <Input icon="search" placeholder="Search..." onChange={onChange} />
      <br />
      <br />
      <Grid columns={4} doubling>
        {comics.map((comic) => (
          <Grid.Column key={comic.id}>
            <Card
              href={`/comics/${comic.id}`}
              image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              header={comic.title}
            />
          </Grid.Column>
        ))}
      </Grid>

      <Divider />

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

export default Comics;
