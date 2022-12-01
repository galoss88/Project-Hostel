import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ChatbotTwo from "./ChatbotTwo";
import { MdChat } from "react-icons/md";
import "./buttonChat.css";
function PopoverPositionedExample() {
  return (
    <>
    
      <OverlayTrigger
        trigger="click"
        className="button-chatbot"
        key="left"
        placement="top-start"
        overlay={
          <Popover id={`popover-positioned-left`}>
            <ChatbotTwo />
          </Popover>
        }
      >
        <Button className="button-chatbot" variant="secondary">
          <MdChat color="white" size={30} />
        </Button>
      </OverlayTrigger>
      
    </>
  );
}

export default PopoverPositionedExample;
