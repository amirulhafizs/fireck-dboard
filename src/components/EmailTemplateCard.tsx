import { useEffect, useRef, useState } from "react";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface EmailTemplateCardProps {
  name: string;
  html: string;
  windowWidth: number;
  onOpen: () => void;
  onDelete: () => void;
}

const EmailTemplateCard: React.FC<EmailTemplateCardProps> = ({
  html,
  name,
  windowWidth,
  onOpen,
  onDelete,
}) => {
  const cardRef = useRef<any>();

  const [cardWidth, setCardWidth] = useState<number>(0);

  useEffect(() => {
    const { width } = cardRef.current.getBoundingClientRect();
    setCardWidth(width);
  }, [windowWidth]);

  const scale = (cardWidth - 56) / 616;

  return (
    <>
      <div className="w-full pt-110%"></div>
      <div
        className="absolute left-0 top-0 w-full h-full flex flex-col rounded-md overflow-hidden"
        ref={cardRef}
      >
        <div className="flex-grow h-0 pt-7 px-7 bg-blue-300">
          <iframe
            src={"data:text/html;charset=utf-8," + escape(html)}
            style={{ width: 616, height: 677, transform: `scale(${scale})` }}
            className="origin-top-left"
          ></iframe>
        </div>
        <div className="flex-shrink-0 w-full flex items-center justify-center bg-gray-301 h-39px relative text-sm">
          {name || "Template name"}
        </div>
      </div>
      <div
        className="absolute w-full h-full left-0 top-0 z-20 group cursor-pointer"
        onClick={onOpen}
      >
        <div className="absolute top-0 left-0 justify-between p-3 w-full z-20 group-hover:opacity-100 opacity-0 transition duration-200 flex">
          <ButtonBase className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301">
            <EditIcon
              fontSize="small"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            ></EditIcon>
          </ButtonBase>
          <ButtonBase className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301">
            <DeleteIcon
              fontSize="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            ></DeleteIcon>
          </ButtonBase>
        </div>
      </div>
    </>
  );
};

export default EmailTemplateCard;
