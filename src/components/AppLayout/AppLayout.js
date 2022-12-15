import { Button, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { logOut } from '../../redux/slices/userSlice';

import classes from './AppLayout.module.css';

const AppLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  let menu = (
    <>
      <Link to="sign-in">
        <Button size="large">Sign In</Button>
      </Link>
      <Link to="sign-up">
        <Button size="large">Sign Up</Button>
      </Link>
    </>
  );

  if (user) {
    menu = (
      <>
        <Link to="new-article">
          <Button size="large">Create article</Button>
        </Link>
        <Link to="profile" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.88)' }}>
          <div className={classes.profile}>
            {user.username}
            <Avatar src={user.image} size={40} />
          </div>
        </Link>
        <Button
          size="large"
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Log Out
        </Button>
      </>
    );
  }

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <Link to="/">
          <Button size="large" type="link">
            Realworld Blog
          </Button>
        </Link>
        <div className={classes.menu}>{menu}</div>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
