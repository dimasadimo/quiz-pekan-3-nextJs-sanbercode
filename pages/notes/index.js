import dynamic from "next/dynamic";
import Link from "next/link";
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueries } from "@/hooks/useQueries";
import useSWR from 'swr';
import fetcher from "@/utils/fetcher";

const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})

export default function Notes({ }) {

  const router = useRouter();
  //const [notes, setNotes] = useState(); 
  //const { data: notes } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes" });
  const { data: notes, isLoading } = useSWR("https://paace-f178cafcae7b.nevacloud.io/api/notes", fetcher, {
    refreshInterval: 10,
    revalidateOnFocus: true,
  });

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
        {
        method: "DELETE",
        });
        const result = await response.json();
        if (result?.success) {
        router.reload();
        }
    } catch (error) {}
  };
  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  //     const listNotes = await res.json();
  //     setNotes(listNotes);
  //   }
  //   fetchingData();
  // }, []);

  return (
    <LayoutComponent metaTitle="Notes" metaDescription="All contents belong to Notes">
      <p className="background-orange">Notes</p>
      {/* {notes.data.map(note => (
        <Link href={`notes/${note.id}`} key={note.id} style={{ border: "1px solid black", width: "100%"}}>
          <ul>
            <li>id: {note.id}</li>
            <li>{`title: ${note.title}`}</li>
            <li>{`description: ${note.description}`}</li>
          </ul>
        </Link>
      ))} */}
      <Box padding="5" marginBottom="4">
        <Flex justifyContent="end" marginBottom="4">
          <Button
            colorScheme="blue"
            onClick={() => router.push("/notes/add")}
          >
          Add Notes
          </Button>
        </Flex>
        <Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {notes?.data?.map((item) => (
              <GridItem key={item.id}>
                <Card>
                  <CardHeader>
                    <Heading>{item?.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{item?.description}</Text>
                  </CardBody>
                  <CardFooter justify="space-between" flexWrap="wrap">
                  <Button
                    onClick={() => router.push(`/notes/edit/${item?.id}`)}
                    flex="1"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                  <Button
                    flex="1"
                    colorScheme="red"
                    marginLeft="5"
                    onClick={() =>HandleDelete(item?.id)}
                  >
                    Delete
                  </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </LayoutComponent>
  );
};
//SSG Static Set Generator
export async function getStaticProps() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes');
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 }
};

Notes.propTypes = {
  notes: PropTypes.object,
};