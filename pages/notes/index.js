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
import Swal from "sweetalert2";
import ModalForm from "@/components/common/modalForm";

const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})

export default function Notes({ notes }) {

  const router = useRouter();
  const [note, setNote] = useState(notes); 
  const [isOpen, setIsOpen] = useState(false);
  const [editObj, setEditObj] = useState({
    isEdit: false, 
    id: "",
  });

  //const { data: notes } = useQueries({ prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes" });
  // const { data: notes, isLoading } = useSWR("https://paace-f178cafcae7b.nevacloud.io/api/notes", fetcher, {
  //   refreshInterval: 10,
  //   revalidateOnFocus: true,
  // });

  const getData = async () => {
    const res = await fetch("/api/notes");
    const listNotes = await res.json();
    setNote(listNotes);
  };

  const HandleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/notes/delete/${id}`);
          const result = await response.json();
          if (result?.success) getData();
        } catch (error) {}
      }
    });
  };

  const HandleModal = () => setIsOpen(!isOpen);

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
            onClick={() => {
              setEditObj({ ...editObj, isEdit: false, id: "" })
              HandleModal(); 
            } //router.push("/notes/add")
          }
          >
          Add Notes
          </Button>
        </Flex>
        <ModalForm isOpen={isOpen} onClose={HandleModal} getData={getData} editObj={editObj}/>
        <Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={5} m={4}>
            {note?.data?.map((item) => (
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
                    onClick={() => {
                      //router.push(`/notes/edit/${item?.id}`)
                      setEditObj({ ...editObj, isEdit: true, id: item.id })
                      HandleModal();
                    }}
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
  const res = await fetch('http://localhost:3000/api/notes');
  const notes = await res.json();
  return { props: { notes } }
};

Notes.propTypes = {
  notes: PropTypes.object,
};