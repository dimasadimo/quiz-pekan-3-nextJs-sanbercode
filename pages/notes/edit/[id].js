import dynamic from "next/dynamic";
import {
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
  
const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})
  
export default function EditNotes() {
  const router = useRouter();
  const { id } = router?.query || {};
  const [notes, setNotes] = useState()
    
  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/notes/edit/${id}`,
        {
        method: "PATCH",
        body: JSON.stringify({ title: notes?.title, description: notes?.description }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`/api/notes/${id}`);
      const listNotes = await res.json();
      setNotes(listNotes?.data)
    }
    fetchingData();
  }, [id]);

  return (
    <LayoutComponent metaTitle="Notes">
      <Card margin="5" padding="5" style={{width: '50%'}}>
        <Heading>Edit Notes</Heading>
        <Grid gap="5">
          <GridItem>
          <Text>Title</Text>
          <Input
            type="text"
            value={notes?.title || ""}
            onChange={(event) =>
            setNotes({ ...notes, title: event.target.value })
            }
          />
        </GridItem>
        <GridItem>
          <Text>Description</Text>
          <Textarea
            value={notes?.description || ""}
            onChange={(event) =>
            setNotes({ ...notes, description: event.target.value })
            }
          />
        </GridItem>
        <GridItem>
          <Button onClick={() => HandleSubmit()} colorScheme="blue">
          Submit
          </Button>
        </GridItem>
        </Grid>
      </Card>
    </LayoutComponent>
);
}