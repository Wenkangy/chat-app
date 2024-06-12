import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
 
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
        display= "flex"
        justifyContent="center"
        p = {3}
        
        w = "200%"
        m="50px 0 15px 0"
        
        textAlign={"center"}
        
       >
          
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
