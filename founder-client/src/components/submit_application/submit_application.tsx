import "./submit_application.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCheckDouble
} from "@fortawesome/free-solid-svg-icons";

export default function ApplicantInfo() {
  return (
    <>
      <div className="head-div">
        <div className="boxes">
          <div>
            <svg width="400" height="110">
              <rect width="238" height="97" rx="18px" />
            </svg>
            <FontAwesomeIcon icon={faClipboardList} className="clipart" />
            <h4 className="number" id="matches-num">
              16
            </h4>
            <h4 className="text" id="matches-text">
              New Job Matches!
            </h4>
          </div>

          <div>
            <svg width="400" height="110">
              <rect width="238" height="97" rx="18px" />
            </svg>
            <FontAwesomeIcon icon={faClipboardList} className="clipart" />
            <h4 className="number" id="applications-num">
              10
            </h4>
            <h4 className="text" id="applications-text">
              Applications
            </h4>
          </div>

          <div>
            <svg width="400" height="110">
              <rect width="238" height="97" rx="18px" />
            </svg>
            <FontAwesomeIcon icon={faCheckDouble} className="clipart" />
            <h4 className="number" id="status-update-num">
              4
            </h4>
            <h4 className="text" id="status-update-text">
              Status Updates
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
