import Table from "./Table";
import PropTypes from "prop-types";

function FilterData({ searchName, searchSkills, searchDesignation, searchOption, employees }) {
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
        } else if (searchOption === "designation") {
          return (
            employee.designation &&
            employee.designation.toLowerCase().includes(searchDesignation.toLowerCase())
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
  searchDesignation: PropTypes.string.isRequired,
  searchOption: PropTypes.oneOf(["name", "skills", "designation"]).isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      designation: PropTypes.string,
    })
  ),
};

export default FilterData;
