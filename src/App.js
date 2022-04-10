// 1. Import *useState* and *useEffect*
import React, { useState, useEffect, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Loading from "./components/Loading";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  GridItem,
  Grid,
  FormControl,
  Input,
  Box,
  SimpleGrid,
  Container as ChakraContainer,
} from "@chakra-ui/react";
import "./App.css";

function App() {
  let [allCountries, setallCountries] = useState([]);
  let [search, setsearch] = useState("");
  let [country, setcountry] = useState("");
  let [currentCountry, setcurrentCountry] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => setallCountries(data));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setsearch(e.target.value);
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://restcountries.com/v2/name/${search}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setcountry(data));
  };

  const allContriesButton = (e) => {
    e.preventDefault();
    setsearch("");
    setcountry("");
  };

  console.log("o pais atual é", currentCountry);

  return (
    <Suspense fallback={<Loading />}>
      <ChakraContainer maxW="1400px">
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {currentCountry && currentCountry.name}
              </AlertDialogHeader>

              <AlertDialogBody>
                {currentCountry && currentCountry.flag ? (
                  <img src={currentCountry.flag} alt="flag" />
                ) : (
                  "No flag"
                )}
                {currentCountry && currentCountry.capital ? (
                  <p>
                    <strong> Capital: </strong> {currentCountry.capital}
                  </p>
                ) : (
                  "No capital"
                )}

                {currentCountry && currentCountry.population ? (
                  <p>
                    <strong> Population: </strong> {currentCountry.population}
                  </p>
                ) : (
                  "No population"
                )}

                {currentCountry && currentCountry.region ? (
                  <p>
                    <strong> Region: </strong> {currentCountry.region}
                  </p>
                ) : (
                  "No region"
                )}

                {currentCountry && currentCountry.subregion ? (
                  <p>
                    <strong> Subregion: </strong> {currentCountry.subregion}
                  </p>
                ) : (
                  "No subregion"
                )}

                {currentCountry && currentCountry.timezones ? (
                  <p>
                    <strong> Timezones: </strong> {currentCountry.timezones}
                  </p>
                ) : (
                  "No timezones"
                )}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => {
                    setcountry([]);
                    onClose();
                  }}
                >
                  Fechar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <div className="App">
          {/* Search Input */}
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={1} spacing={90} mt={10} mb={10}>
              <Box>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search for a country"
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              {/*  <Box>
                <Button
                  type="button"
                  colorScheme="blue"
                  onClick={allContriesButton}
                >
                  All countries
                </Button>
              </Box> */}
            </SimpleGrid>
          </form>

          {country.length > 0 ? (
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {country.map((country) => (
                <GridItem
                  key={country.name}
                  onClick={() => {
                    setcurrentCountry(country);
                    console.log("Esse pais se chama:", country);
                    onOpen();
                  }}
                >
                  <div className="boxShadow">
                    <img src={country.flag} alt={country.name} with="100%" />
                    <div className="informationGeneral">
                      <p>
                        <strong>Nome:</strong> {country.name}
                      </p>
                      <p>
                        <strong>Capital:</strong> {country.capital}
                      </p>
                      <p>
                        <strong>População:</strong> {country.population}
                      </p>
                    </div>
                  </div>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <div className="displayAll">
              {/* Display flags */}

              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {allCountries.map((country, index) => {
                  return (
                    <GridItem
                      w="100%"
                      h="100%"
                      key={index}
                      onClick={() => {
                        setcurrentCountry(country);
                        console.log("Esse pais se chama:", country);

                        onOpen();
                      }}
                    >
                      <div className="boxShadow">
                        <img src={country.flag} alt="flag" />
                        <div className="informationGeneral">
                          <p>
                            <strong>Nome:</strong> {country.name}
                          </p>
                          <p>
                            <strong>Capital:</strong> {country.capital}
                          </p>
                          <p>
                            <strong>População:</strong> {country.population}
                          </p>
                        </div>
                      </div>
                    </GridItem>
                  );
                })}
              </Grid>
            </div>
          )}
        </div>
      </ChakraContainer>
    </Suspense>
  );
}

export default App;
