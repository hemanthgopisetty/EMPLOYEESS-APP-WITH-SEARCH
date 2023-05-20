import { useEffect, useState } from "react";
import FilterData from "./Filter";
import Table from "./Table";


const App = () => {
  const [flag, setFlag] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [searchOptions, setSearchOptions] = useState([
    { value: "name", label: "Name" },
    { value: "skills", label: "Skills" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
        );
        const jsonData = await response.json();
        setEmployees(jsonData.employees);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = () => {
    setFlag(!flag);
    setSearchOption("name");
    setSearchName("");
    setSearchSkills("");
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    setFlag(false);
  };

  const handleSearchSkillsChange = (event) => {
    setSearchSkills(event.target.value);
    setFlag(false);
  };

  const handleSearchOptionChange = (selectedOption) => {
    setSearchOption(selectedOption.value);
    setSearchName(""); 
    setSearchSkills("");

    
    if (selectedOption.value === "name" || selectedOption.value === "skills") {
      setFlag(false); 
    } else {
      setFlag(true); 
    }
    setSearchOptions([
      { value: "name", label: "Name" },
      { value: "skills", label: "Skills" },
    ]);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <label className="p-2 font-bold">Search by:</label>
        <select
          value={searchOption}
          onChange={(e) =>
            handleSearchOptionChange(
              searchOptions.find((option) => option.value === e.target.value)
             
            )
          }
          className="m-2 p-2 border-2 rounded-lg bg-white font-bold"
        >
          {searchOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <label className="p-2 font-bold">Search:</label>
        {searchOption === "name" ? (
          <input
            type="text"
            value={searchName}
            placeholder="Enter the Name"
            onChange={handleSearchNameChange}
            className="p-2 m-2 rounded-md"
          />
        ) : (
          <input
            type="text"
            value={searchSkills}
            placeholder="Enter the Skill"
            onChange={handleSearchSkillsChange}
            className="p-2 m-2 rounded-md"
          />
        )}
        <button
          className="m-2 p-2 border-2 rounded-lg bg-white font-bold"
          onClick={handleButtonClick}
          title="First Click this option to see the results"
        >
          {flag ? <p>Show</p> : <p>Clear</p>}
        </button>
      </div>t
      <div className="flex items-center justify-center">
        {flag ? (
          <Table employees={employees} />
        ) : (
          <FilterData
            searchName={searchName}
            searchSkills={searchSkills}
            searchOption={searchOption}
            employees={employees}
          />
        )}
      </div>
    </div>
  );
};

export default App;



