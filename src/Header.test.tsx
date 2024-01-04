import { render,screen } from "@testing-library/react";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import store from './redux/store/reducer/action/store';
test('render header component',async ()=>{
    render(
    <Provider store={store}>
        <Header />
      </Provider>
    )
    const headerElement =  await screen.findByText(/Global Bank/i);
  expect(headerElement).toBeInTheDocument();
})