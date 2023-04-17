import styled from "styled-components";

export const ContainerLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.5px;
`;
export const LoginBox = styled.form`
  height: 350px;
  width: 400px;
  max-width: 400px;
  max-height: 470px;
  position: relative;
  padding: 50px;
  border: 2.5px solid;
  margin-top: 200px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 0px 5px;
`;

export const H2Tag = styled.h2`
  padding-bottom: 10px;
`;

export const InputField = styled.div`
  padding: 10px;
  margin-left: 5px;
  border: none;
`;

export const Button = styled.div`
  padding: 10px;
`;

export const Header = styled.h1`
  position: absolute;
  margin-top: -35%;
  margin-left: 15%;
`;

export const InputTag = styled.input`
  height: 40px;
  padding-left: 20px;
  border: 1.5px solid #ccc;
  display: inline-block;
  border-radius: 3px;
  width: 250px;
  outline: none;
`;

export const ButtonSign = styled.button`
  background: rgb(15, 98, 167);
  border: none;
  color: white;
  font-size: 15px;
  border-radius: 5px;
  margin: 10px 15px;
  cursor: pointer;
  height: 35px;
  padding-inline: 30px;
`;

export const ButtonReset = styled.button`
  background: rgb(223, 148, 8);
  border: none;
  color: white;
  font-size: 15px;
  border-radius: 5px;
  margin: 10px 15px;
  cursor: pointer;
  height: 35px;
  padding-inline: 30px;
`;

export const HeaderImg = styled.img`
  position: absolute;
  margin-top: -35%;
  margin-left: -35%;
`;

export const Background = styled.div`
  background-color: #f2f2f2;
`;

export const Pass = styled.div`
  margin-left: -140px;
  font-size: 0.7em;
  color: #3b3a3a;
  text-decoration: none;
`;