import { Icon, IconButton, Image } from '@chakra-ui/react';
import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { BsPeopleFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { img_logo } from '../../../assets';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <ProSidebar className="h-screen" collapsed={!open}>
      <Menu>
        <div className="flex justify-center align-middle">
          <Image
            src={img_logo}
            alt="logo"
            width={100}
            className="mt-7 mx-10 px-2 pb-5"
          />
        </div>
        <MenuItem
          icon={<Icon as={BsPeopleFill} />}
          component={<Link to="/users" />}
        >
          Users
        </MenuItem>
        <MenuItem component={<Link to="/podcasts" />}> Podcasts </MenuItem>
        <MenuItem>
          <IconButton
            width="100%"
            icon={<Icon as={open ? BsChevronLeft : BsChevronRight} />}
            aria-label="Show"
            onClick={() => setOpen(!open)}
          />
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}
