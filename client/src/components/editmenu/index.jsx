/**
 * This page component displays the Edit Menu
 *
 * destructs toggleForm, isOpen, setIsOpen
 *
 *
 *
 * TO DO NOTES : crud operations working but delay when updated or added into DB, refreshs before it is added sometiems
 * need to wait for db confirmation before reloading the grid
 */

import { useEffect, useState } from "react";

export default function EditMenu({
  toggleForm,
  isOpen,
  setIsOpen,
  selectedProject,
  updateProject,
  createProject,
  viewClicked,
  setViewClicked,
  addClicked,
  setAddClicked,
  editClicked,
  setEditClicked,
  reloadTheGrid,
}) {
  // * state
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  //*

  // conditional
  // check to make sure there is a value in selected projects
  // if there is then set the project default values for each input
  // if we dont have this here the default value triggers an undefined error on page load when there is no selection yet
  // dependencies : selectedProject
  useEffect(() => {
    if (selectedProject.length > 0) {
      setProjectId(selectedProject[0].id);
      setProjectName(selectedProject[0].projectName);
      setDateCreated(selectedProject[0].dateCreated);
      setAssignedTo(selectedProject[0].assignedTo);
      setProjectDescription(selectedProject[0].projectDesc);

      console.log("set project defaults");
    } else {
      setProjectId("");
      setProjectName("");
      setDateCreated("");
      setAssignedTo("");
      setProjectDescription("");
    }
  }, [selectedProject]);

  // handles the submit from update form
  // logs current project id
  // creates a new object with the updated state variables from the inputs
  // calls update project , pass the project id and updated project object
  const submitUpdatedProject = () => {
    const updatedProject = {
      projectName: projectName,
      projectDesc: projectDescription,
      assignedTo: assignedTo,
      dateCreated: dateCreated,
    };

    updateProject(projectId, updatedProject);
    console.log("updating project", projectId);

    toggleForm();

    reloadTheGrid();
  };

  const submitAddedProject = () => {
    const addedProject = {
      projectName: projectName,
      projectDesc: projectDescription,
      assignedTo: assignedTo,
      dateCreated: dateCreated,
    };

    createProject(addedProject);
    console.log("adding project", projectName);

    toggleForm();

    reloadTheGrid();
  };

  // handles click off menu
  // closes menu and resets button states

  const handleClickOff = () => {
    setAddClicked(false);
    setEditClicked(false);
    setViewClicked(false);

    toggleForm();
  };
  return (
    <div>
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => handleClickOff()}
      />

      <div
        className={`fixed top-0 right-0 w-full max-w-2xl h-full bg-gray-800 text-gray-100 p-8 shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-white">Add New Project</h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Project ID
            </label>
            <input
              type="text"
              id="projectName"
              defaultValue={projectId}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
              placeholder={addClicked && "ID will be generated automatically"}
            />
          </div>
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter Project name"
              disabled={viewClicked}
            />
          </div>

          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Assign Project"
              disabled={viewClicked}
            />
          </div>

          <div>
            <label
              htmlFor="dateCreated"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Date Created
            </label>
            <input
              type="date"
              id="dateCreated"
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={viewClicked}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter Description"
              disabled={viewClicked}
            />
          </div>

          {viewClicked && (
            <button
              type="button"
              className="w-full px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={(e) => {
                e.preventDefault();
                setViewClicked(!viewClicked);
                setEditClicked(!editClicked);
              }}
            >
              Edit
            </button>
          )}

          {editClicked && (
            <button
              type="button"
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={(e) => {
                e.preventDefault();
                submitUpdatedProject();
                setEditClicked(!editClicked);
              }}
            >
              Save Edit
            </button>
          )}

          {addClicked && (
            <button
              type="button"
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={(e) => {
                e.preventDefault();
                submitAddedProject();
                setAddClicked(!addClicked);
              }}
            >
              Add Project
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
