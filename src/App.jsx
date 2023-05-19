import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Table = ({ employees }) => {
  if (!employees || employees.length === 0) {
    return (
      <p className="text-xl font-extrabold ">
        {employees ? "No employees found." : "No employees data available."}
      </p>
    );
  }
  return (
    <table className="table-auto shadow-xl border  border-transparent m-2 mb-8 ">
      <thead className="text-black">
        <tr className="bg-black text-white">
          <th className="py-3  ">Name</th>
          <th className="py-3 ">Designation</th>
          <th className="py-3  ">Skills</th>
          <th className="py-3 ">Projects</th>
        </tr>
      </thead>
      <tbody className="text-cyan-900 text-center [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-white">
        {employees.map((employee) => (
          <tr key={employee.id} className="cursor-pointer duration-300  ">
            <td className="py-3 px-6 ">{employee.name ? employee.name : "N/A"}</td>
            <td className="py-3 px-6">
              {employee.designation ? employee.designation : "N/A"}
            </td>
            <td className="py-3 px-6">
              {employee.skills.length > 0 ? employee.skills.join(", ") : "N/A"}
            </td>
            <td className="py-3 px-6">
              {employee.projects && employee.projects.length > 0 ? (
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Team</th>
                      <th>Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.projects.map((project, index) => (
                      <tr key={index} className="rounded-lg">
                        <td className=" border border-black/30 ">
                          {project.name ? project.name : "N/A"}
                        </td>
                        <td className="border border-black/30">
                          {project.description
                            ? project.description
                            : "N/A"}
                        </td>
                        <td className=" border border-black/30">
                          {project.team && project.team.length > 0
                            ? project.team.map((member, idx) => (
                                <div key={idx}>
                                  {member.name ? member.name : "N/A"} -{" "}
                                  {member.role ? member.role : "N/A"}
                                </div>
                              ))
                            : "N/A"}
                        </td>
                        <td className=" border border-black/30 ">
                          {project.tasks && project.tasks.length > 0
                            ? project.tasks.map((task, idx) => (
                                <div key={idx} className="">
                                  {task.name ? task.name : "N/A"} -{" "}
                                  {task.status ? task.status : "N/A"}
                                </div>
                              ))
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      designation: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      projects: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          team: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              role: PropTypes.string,
            })
          ),
          tasks: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              status: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
};

function FilterData({ searchName, searchSkills, searchOption, employees }) {
  const filteredEmployees = employees
    ? employees.filter((employee) => {
        if (searchOption === "name") {
          return (
            employee.name &&
            employee.name.toLowerCase().includes(searchName.toLowerCase())
          );
        } else if (searchOption === "skills") {
          return employee.skills.some((skill) =>
            skill.toLowerCase().includes(searchSkills.toLowerCase())
          );
        }
        return false;
      })
    : [];

  return <Table employees={filteredEmployees} />;
}

FilterData.propTypes = {
  searchName: PropTypes.string.isRequired,
  searchSkills: PropTypes.string.isRequired,
  searchOption: PropTypes.oneOf(["name", "skills"]).isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

const App = () => {
  const [flag, setFlag] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [searchOption, setSearchOption] = useState("name");

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
  };

  const handleSearchSkillsChange = (event) => {
    setSearchSkills(event.target.value);
  };

  const handleSearchOptionChange = (option) => {
    setSearchOption(option);
    setSearchName("");
    setSearchSkills("");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <label className="p-2 font-bold">Search by:</label>
        <button
          className={`m-2 p-2 border-2 rounded-lg bg-white font-bold ${
            searchOption === "name" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleSearchOptionChange("name")}
        >
          Name
        </button>
        <button
          className={`m-2 p-2 border-2 rounded-lg bg-white font-bold ${
            searchOption === "skills" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleSearchOptionChange("skills")}
        >
          Skills
        </button>
      </div>
      <div className="flex items-center justify-center">
        <label className="p-2 font-bold">Search:</label>
        {searchOption === "name" ? (
          <input
            type="text"
            value={searchName}
            onChange={handleSearchNameChange}
            className="p-2 m-2 rounded-md"
          />
        ) : (
          <input
            type="text"
            value={searchSkills}
            onChange={handleSearchSkillsChange}
            className="p-2 m-2 rounded-md"
          />
        )}
        <button
          className="m-2 p-2 border-2 rounded-lg bg-white font-bold"
          onClick={handleButtonClick}
          title="Keep this option hide to see the filter results"
        >
          {flag ? <p>Show</p> : <p>Hide</p>}
        </button>
      </div>
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
