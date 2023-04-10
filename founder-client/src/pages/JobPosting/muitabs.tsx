import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

export const MuiTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "600px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="Tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            centered
            scrollButtons="auto"
          >
            <Tab iconPosition="start" label="Summary" value="1" />
            <Tab label="Details" value="2" />
            <Tab label="Company Info" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div>
            <h3>Requirements</h3>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
              <li>
                Fusce congue dui vitae eros elementum mollis. Sed pretium tempor
                tortor sit amet lacinia. Fusce in odio sed ex interdum
                venenatis. Curabitur ac dolor ipsum. Sed diam enim, pellentesque
                ut ante vitae, eleifend ultricies magna. Ut fermentum cursus
                nisl at viverra. Pellentesque id tempor turpis.{" "}
              </li>
              <li>Pellentesque at libero id dolor accumsan laoreet. </li>
              <li>
                Proin erat nisl, lacinia vitae venenatis ac, volutpat fringilla
                massa. Vivamus convallis tristique nulla, non sollicitudin ante
                rutrum in. Pellentesque nunc purus, venenatis convallis tempor
                eget, vestibulum eget nibh. Praesent auctor elementum commodo.
              </li>

              <li>
                Sed volutpat ex erat, eu sagittis nibh fermentum at. Vivamus at
                massa elementum, imperdiet metus et, lobortis urna. Maecenas
                rhoncus ligula ut velit molestie vehicula. Praesent consequat
                enim at metus vehicula, non facilisis nibh volutpat. Etiam ac
                metus viverra dui pharetra vehicula sed at nisl. In semper orci
                ac nibh posuere ornare.{" "}
              </li>
              <li>
                Aliquam sem urna, maximus quis suscipit at, congue eu tellus.
                Quisque rutrum, erat et vehicula mollis, nunc neque scelerisque
                odio, vel aliquet augue sem ultricies neque. Phasellus suscipit
                mi velit, eu sodales turpis vehicula a. Aenean mattis cursus
                massa, ut vehicula felis laoreet vel. Suspendisse et ex semper,
                maximus ex non, condimentum velit.{" "}
              </li>
              <li>
                Integer nibh purus, tempus sit amet lacus in, efficitur semper
                urna.{" "}
              </li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value="2">Detail stuff</TabPanel>
        <TabPanel value="3">Company Info stuff</TabPanel>
      </TabContext>
    </Box>
  );
};