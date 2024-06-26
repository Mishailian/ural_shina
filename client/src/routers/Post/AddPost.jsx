import { useAddField } from "../../hooks/useAddField/useAddField";
import { useInputCheck } from "../../hooks/useInputCheck";
import { useAddPostMutation } from "../../app/api/apiSlice";
import { staticApi } from "../../static/static";
import { TasksHeader } from "../../forms/tasksHeader";
import { useEffect, useState } from "react";
import { TasksInputFields } from "../../auxСomponents/TasksInputFields";
import { docxCreator } from "../../../docx/docx_creator";

export const AddPost = () => {
  const [isSubmite, setSubmite] = useState(false);
  var s = staticApi();
  const [postObj] = useAddPostMutation();
  const { formData, handleChange, handleSubmit, setData } = useInputCheck();
  var { component, componentData, repeatControll, addField } = useAddField(
    s.structure.addPosition,
    TasksInputFields
  );
  useEffect(() => {
    setData(s.structure.addPost);
  }, []);

  useEffect(() => {
    isSubmite && handleSubmit(postObj);
  }, [isSubmite]);

  return (
    <>
      <div className="flex text-center">
        <p className="basis-11/12 ">служебная записка</p>
      </div>

      <div className="h-5/6  overflow-scroll shadow-lg highlightSecondEl items-center">
        <TasksHeader />
        {component}
      </div>
      <div className="flex justify-end addPostButtons">
        {repeatControll}
        <div className="flex justify-center items-center">
          <button className="dButton p-2 pl-4 pr-4 mr-2" onClick={addField}>
            +
          </button>
          <button
            className="dButton p-2  ml-2 mr-4"
            data-testid="AddPostSubmite"
            onClick={() => {
              docxCreator(componentData.formData);
              handleChange({ about: JSON.stringify(componentData.formData) });
              setSubmite(true);
            }}
          >
            добавить пост
          </button>
        </div>
      </div>
    </>
  );
};
