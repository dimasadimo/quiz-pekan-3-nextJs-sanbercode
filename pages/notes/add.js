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
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
  
const LayoutComponent = dynamic(() => import('@/layout'), {
  loading: () => <p>Loading...</p>,
})
  
export default function AddNotes() {
  const { mutate } = useMutation();
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  
  const HandleSubmit = async () => {
    // try {
    //   const response = await fetch(
    //     "https://paace-f178cafcae7b.nevacloud.io/api/notes",
    //     {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(notes),
    //     }
    //   );
    //   const result = await response.json();
    //   if (result?.success) {
    //     router.push("/notes");
    //   }
    // } catch (error) {}
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
      payload: notes,
    });
    
    if (response?.success) {
      router.push("/notes");
    }
    
  };

  return (
    <LayoutComponent metaTitle="Notes">
      <Card margin="5" padding="5" style={{width: '50%'}}>
      <Heading>Add Notes</Heading>
        <Grid gap="5">
        <GridItem>
          <Text>Title</Text>
          <Input
          type="text"
          onChange={(event) =>
            setNotes({ ...notes, title: event.target.value })
          }
          />
        </GridItem>
        <GridItem>
        <Text>Description</Text>
          <Textarea
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
};
