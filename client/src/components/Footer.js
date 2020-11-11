import { IconButton, ButtonGroup } from '@material-ui/core';
import { LinkedIn, Twitter, GitHub } from '@material-ui/icons';

const Footer = function (props) {
  const buttons = [
    {
      icon: <LinkedIn />,
      target: 'https://www.linkedin.com/in/bonnie-schulkin/',
      label: 'linked in',
    },
    {
      icon: <Twitter />,
      target: 'https://twitter.com/bonniedotdev/',
      label: 'twitter',
    },
    { icon: <GitHub />, target: 'http://github.com/bonnie', label: 'github' },
  ];

  return (
    <ButtonGroup variant="text" aria-label="text primary button group">
      {buttons.map((button, i) => (
        <IconButton key={i} aria-label={button.label} href={button.target}>
          {button.icon}
        </IconButton>
      ))}
    </ButtonGroup>
  );
};

export default Footer;
