import { useState } from 'react';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};

export default Navigation;
