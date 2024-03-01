

// eslint-disable-next-line react/prop-types
const PlanetList = ({ planets }) => (
  <>
    {
        // eslint-disable-next-line react/prop-types
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
      </div>
    ))}
  </>
);

export default PlanetList;
