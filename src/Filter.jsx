import Table from "./Table";
import PropTypes from "prop-types";
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

  export default FilterData;