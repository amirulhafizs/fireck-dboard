import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import SelectMedia, { SelectMediaProps } from "pages/Media/SelectMedia";
import { callComponent } from "api/callComponent";

export interface RichTextProps {
  style?: React.CSSProperties;
  onChange: (a: string) => void;
  value: string;
}

const RichText: React.FC<RichTextProps> = ({ style = {}, onChange, value }) => {
  const mdParser = new MarkdownIt();

  return (
    <div>
      <style>{`.rc-md-navigation .button-wrap .button {
        background-color: white !important;
        border-radius: 4px !important;
        margin-bottom: 2px !important;
        margin-top: 2px !important;
      }

      .rc-md-navigation{
        border-bottom: none !important;
        background-color: transparent !important;
        margin-bottom: 4px;
      }

      .rc-md-editor{
        background-color: #EFF3F8 !important;
        border: none !important;
        padding: 7px !important;
        border-radius: 4px !important;
      } 

      .rc-md-editor textarea{
        background-color: transparent !important;
        // border-radius: 4px !important;
        overflow: auto !important;
        border-right: 1px solid #DDDDDD !important;
      }

      
      
      `}</style>
      <MdEditor
        placeholder="Type here..."
        onCustomImageUpload={(e) => {
          return new Promise(async (resolve, reject) => {
            const res = await callComponent<SelectMediaProps, string | boolean>({
              Component: SelectMedia,
              props: { multiple: false },
            });

            if (typeof res === "string") {
              resolve({ url: res, text: "image" });
            } else {
              reject();
            }
          });
        }}
        value={value}
        onChange={({ text }) => onChange(text)}
        style={style}
        renderHTML={(text) => mdParser.render(text)}
      />
    </div>
  );
};

export default RichText;
