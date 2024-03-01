import { useState, useEffect } from "react";
import axios from "axios";
import HeroImage from "../assets/hero.jpg";
import ResidentList from "./ResidentList";
import Pagination from "./Pagination";
const planetImages = Array.from(
  { length: 9 },
  (_, i) => `/images/planet-0${i + 1}.png`
);

const PlanetDirectory = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchResidentDetails = async (residentUrl) => {
    try {
      const response = await axios.get(residentUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching resident data: ", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      setPlanets([]);
      setLoading(true);

      try {
        const response = await axios.get(
          `https://swapi.dev/api/planets/?page=${page}&format=json`
        );
        const fetchedPlanets = response.data.results.map((planet, index) => ({
          ...planet,
          loadingResidents: true,
          residentsData: [],
          image: planetImages[index % planetImages.length],
        }));
        setPlanets(fetchedPlanets);
        setLoading(false);
        console.log("Use Effect first");

        // Fetch residents for each planet
        const updatedPlanets = await Promise.all(
          fetchedPlanets.map(async (planet) => {
            const residentsData = [];
            for (let i = 0; i < planet.residents.length; i++) {
              try {
                const residentUrl = planet.residents[i];
                const residentData = await fetchResidentDetails(residentUrl);
                residentsData.push(residentData);
              } catch (error) {
                console.error("Error fetching resident data: ", error);
              }
            }
            return { ...planet, residentsData, loadingResidents: false }; // Update loading state for each planet
          })
        );
        setPlanets(updatedPlanets);
        console.log("Use Effect second");
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [page]);

  console.log("Outside useffect");

  return (
    <div className="text-white">
      <div>
        <img
          src={HeroImage}
          className="-z-10 fixed w-full h-full top-0 left-0 object-cover"
          alt="hero"
        />
      </div>
      <h1 className=" sm:text-9xl text-6xl text-center font-black">
        Star wars
      </h1>
      {loading ? (
        <p className="text-4xl font-black text-center">Loading...</p>
      ) : (
        planets.map((planet) => (
          <div key={planet.name}>
            <div className="text-center items-center gap-16 my-16 mx-auto">
              <img
                src={planet.image}
                alt={planet.name}
                className="mx-auto sm:w-[60%] w-[95%] object-cover rounded-lg"
              />
              <div>
                <h2 className="sm:text-7xl text-4xl font-black">
                  {planet.name}
                </h2>
                <p className="mt-4 text-xl">
                  <span className="font-black">Climate:</span> {planet.climate}
                </p>
                <p className="text-xl">
                  <span className="font-black">Population:</span>{" "}
                  {planet.population}
                </p>
              </div>
            </div>
            {planet.loadingResidents ? (
              <p className="text-4xl font-black text-center">Loading residents...</p>
            ) : (
              <ResidentList residentsData={planet.residentsData} />
            )}
          </div>
        ))
      )}
      <Pagination setPage={setPage}/>
    </div>
  );
};

export default PlanetDirectory;
