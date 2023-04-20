import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';

const MainLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);


const MainLayoutContent = experimentalStyled('div')({
  display: 'flex',
  paddingTop: 64,
  height: '100%',
  overflow: 'auto'
});

const MainLayout = () => (
  <MainLayoutRoot>
    <MainLayoutContent>
      <Outlet />
    </MainLayoutContent>
  </MainLayoutRoot>
);

export default MainLayout;
