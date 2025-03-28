import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Frame } from './pages/Frame';
import { Returns } from './pages/Returns';
import { Clients } from './pages/Clients';
import { Cpas } from './pages/CPAs';

const App = () => {
  return (
	<>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={< Frame/>}>
					<Route index element={<Returns/>} />
					<Route path='returns' element={<Returns/>} />
					<Route path='clients' element={<Clients/>} />
					<Route path='cpas' element={<Cpas/>} />
				</Route>	
			</Routes>
		</BrowserRouter>
	</>
  );
}

export default App;
