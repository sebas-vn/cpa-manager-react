import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Frame } from './pages/Frame';
import { Returns } from './pages/Returns';

const App = () => {
  return (
	<>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={< Frame/>}>
					<Route index element={<Returns/>} />
					<Route path='returns' element={<Returns/>} />
				</Route>	
			</Routes>s
		</BrowserRouter>
	</>
  );
}

export default App;
