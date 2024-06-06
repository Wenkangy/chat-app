import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory  } from "react-router";
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

const HomePage = () => {

  const history = useHistory ();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  

  return (
    <Container maxW='xl'centerContent>
       <Box
        d = "flex"
        justifyContent="center"
        p = {3}
        bg ={"white"}
        w = "200%"
        m="50px 0 15px 0"
        borderRadius="lg"
        borderWidth={"1px"}
        textAlign={"center"}
        
       >
          <Text fontSize={"4xl"}fontFamily={"Work sands"} color={"black"}> Talk-Live</Text>
       </Box>
       <Box bg={"white"} p={4} w={"200%"} borderRadius={"lg"} borderWidth ={"1px"} textColor={"black"}>
        <Tabs variant={"soft-rounded"} colorScheme='gray'>
        <TabList mb={"1em"}>
          <Tab width={"50%"}>Login</Tab>
          <Tab width={"50%"}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <SignUp/>
          </TabPanel>
        </TabPanels>
      </Tabs>
       </Box>
    </Container>
  )
}

export default HomePage
