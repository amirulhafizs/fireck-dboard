import Modal from "@material-ui/core/Modal";
import EmailEditor from "react-email-editor";
import Button from "components/Button";
import Input from "components/GrayInput";
import { useState, useRef, useEffect } from "react";
import { Template } from "pages/Emails";

export interface EmailEditorModalProps {
  onClose: () => void;
  onSave: (template: any) => void;
  editTemplate?: Template;
}

const EmailEditorModal: React.FC<EmailEditorModalProps> = ({ onClose, onSave, editTemplate }) => {
  const emailEditorRef = useRef<any>();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!editTemplate) return;
    setName(editTemplate.name);
  }, [editTemplate]);

  const onSaveClick = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.saveDesign((res: any) => {
        emailEditorRef.current.editor.exportHtml((data: any) => {
          onSave({
            ...editTemplate,
            template: res || editTemplate?.template,
            html: data.html || editTemplate?.html,
            name,
          });
          setName("");
        });
      });
    }
  };

  const onLoad = () => {
    if (editTemplate) {
      if (emailEditorRef.current && Object.keys(editTemplate.template).length) {
        emailEditorRef.current.editor.loadDesign(editTemplate.template);
      } else {
        setTimeout(() => {
          if (emailEditorRef.current && Object.keys(editTemplate.template).length) {
            emailEditorRef.current.editor.loadDesign(editTemplate.template);
          }
        }, 3000);
      }
    }
  };

  const onDownload = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.exportHtml((data: any) => {
        var dataStr = "data:text/html;charset=utf-8," + escape(data.html);
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", name || "email-template" + ".html");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
    }
  };

  return (
    <Modal open={true}>
      <div className="fixed left-0 top-0 w-full h-full overflow-auto flex p-12">
        <div className="m-auto bg-white">
          <div className="flex justify-between p-4 items-center">
            <div className="flex">
              <Input
                placeholder="Type name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mr-3"
              ></Input>
              <Button
                className="bg-orange-300 hover:bg-orange-301 mr-3"
                onClick={(e) => {
                  if (!name) {
                    alert("Name is empty");
                    return;
                  }

                  e.currentTarget.innerHTML = "Saving...";
                  onSaveClick();
                }}
              >
                Save
              </Button>
              <Button onClick={onDownload} className="bg-gray-301 hover:bg-gray-302">
                Download
              </Button>
            </div>
            <Button className="bg-blue-300 hover:bg-blue-400 text-white" onClick={onClose}>
              Close
            </Button>
          </div>
          <EmailEditor onLoad={onLoad} ref={emailEditorRef}></EmailEditor>
        </div>
      </div>
    </Modal>
  );
};

export default EmailEditorModal;
