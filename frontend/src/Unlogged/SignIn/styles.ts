import colors from "assets/colors/colors";
import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.backgroundPrimary};
  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
`;

export const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 200px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    justify-items: center;
    text-align: center;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const LogoImg = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Input = styled.input`
  height: 64px;
  border-radius: 6px;
  border: none;
  padding: 0 20px;
  background: ${colors.inputBackground};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15), inset 0 -2px 0 rgba(0, 0, 0, 0.04);
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: ${colors.inputPlaceholder};
  }

  @media (max-width: 480px) {
    height: 50px;
    font-size: 14px;
    padding: 0 15px;
  }
`;

export const Button = styled.button`
  height: 56px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(
    180deg,
    ${colors.buttonGradientStart} 0%,
    ${colors.buttonGradientEnd} 100%
  );
  color: ${colors.buttonText};
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.12);

  @media (max-width: 480px) {
    height: 50px;
    font-size: 18px;
  }
`;
