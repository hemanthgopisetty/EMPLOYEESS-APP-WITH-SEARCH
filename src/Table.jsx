import PropTypes from "prop-types";

const Table = ({ employees }) => {
    let flag=true;
    if (!employees || employees.length === 0) {
        flag=false;
    }
    return (
      flag?<table className="table-auto shadow-xl border  border-transparent m-2 mb-8 ">
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
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Description</th>
                        <th className="py-3 px-6">Team</th>
                        <th className="py-3 px-6">Tasks</th>
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
      </table>:<p className="font-bold text-lg">Data Not Found</p>
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

export default Table;