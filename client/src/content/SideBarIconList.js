import { InboxOutlined, ArrowOutward, ArchiveOutlined, StarBorderOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

// import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const sideBarIcons = [{
  name : 'Inbox',
  element : InboxOutlined
},{
  name : 'Sent',
  element : ArrowOutward
},{
  name : 'Delete',
  element : DeleteOutlineOutlined
},{
  name : 'Starred',
  element : StarBorderOutlined
},{
  name : 'Archive',
  element : ArchiveOutlined
}]

export { sideBarIcons };