

// eslint-disable-next-line react/prop-types
const ResidentList = ({ residentsData }) => (
  <div>
    <h3 className="text-center my-8 text-5xl font-black">Residents</h3>
    
    { // eslint-disable-next-line react/prop-types 
    residentsData && residentsData.length === 0 ? (
      <p className="bg-white bg-opacity-20 opacity-100 p-8 rounded-lg text-white mx-auto w-[200px]">
        No residents found
      </p>
    ) : (
      <ul className="flex flex-wrap gap-16 justify-evenly">
        
        {// eslint-disable-next-line react/prop-types
        residentsData.map((residentData) => (
          <li
            className="flex flex-col text-xl sm:w-[400px] w-[300px] sm:h-[400px] h-[300px] mb-16 bg-white bg-opacity-20 opacity-100 p-8 rounded-lg text-white"
            key={residentData.name}
          >
            <img
              src={`/aliens/alien-${Math.floor(Math.random() * 13) + 1}.svg`}
              alt="Alien"
              className="mx-auto mb-4 rounded-lg"
            />
            <p>
              <strong>Name:</strong> {residentData.name}
            </p>
            <p>
              <strong>Height:</strong> {residentData.height}
            </p>
            <p>
              <strong>Mass:</strong> {residentData.mass}
            </p>
            <p>
              <strong>Gender:</strong> {residentData.gender}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ResidentList;
