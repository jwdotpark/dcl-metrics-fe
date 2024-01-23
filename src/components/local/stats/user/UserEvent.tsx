/* eslint-disable react/no-children-prop */
import {
  Text,
  Image,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Spacer,
  Spinner,
  Divider,
} from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"

type UserEventProps = {
  event: any
  userAddressRes: any
}

const UserEvent = ({ event, userAddressRes }: UserEventProps) => {
  const { data } = event
  const { name } = userAddressRes
  let eventTable: JSX.Element

  if (!event.ok) {
    eventTable = (
      <Center h="350px">
        <Spinner />
      </Center>
    )
  } else {
    eventTable = (
      <Box m="0" mt="-2" mb="4">
        {data.map((item) => {
          return (
            <>
              <Accordion allowMultiple allowToggle defaultIndex={[1]}>
                <AccordionItem key={item.name} border="none">
                  <AccordionButton>
                    <Flex w="100%">
                      <Box>
                        <Image
                          w="auto"
                          h="50px"
                          borderRadius="md"
                          objectFit="cover"
                          alt={item.name}
                          src={item.image}
                        />
                      </Box>
                      <Center ml="4" textAlign="left" wordBreak="keep-all">
                        <Text fontSize="sm">{item.name}</Text>
                      </Center>
                      <Spacer />
                      <Center>
                        <AccordionIcon />
                      </Center>
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Box>
                      <Center mb="4" mx={[4, 8, 12, 16]}>
                        <Image
                          borderRadius="xl"
                          objectFit="cover"
                          alt={item.name}
                          src={item.image}
                        />
                      </Center>
                      <Flex direction="row">
                        <Box w="100%" mt="2">
                          <ReactMarkdown
                            components={ChakraUIRenderer()}
                            children={item.description}
                            skipHtml
                          />
                        </Box>
                      </Flex>
                      <Divider my="4" />
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              {/*<Box key={item.name}>{item.name}</Box>*/}
            </>
          )
        })}
      </Box>
    )
  }

  return (
    <Box mb="4">
      <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
        <BoxTitle
          name={`User Event`}
          description={`Event that is created by ${name}`}
          date=""
          avgData={[]}
          slicedData={{}}
          color={""}
          line={false}
          setLine={{}}
        />
        {eventTable}
      </BoxWrapper>
    </Box>
  )
}

export default UserEvent
