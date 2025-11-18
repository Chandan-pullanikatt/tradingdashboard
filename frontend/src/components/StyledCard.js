import styled from "styled-components";

export const Card = styled.div`
  background: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.colors.shadow};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const PrimaryButton = styled.button`
  background: ${props => props.theme.colors.buttonPrimaryGradient};
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
  transition: transform 0.1s;
  font-size: 1rem;
  &:hover {
    transform: translateY(-2px) scale(1.04);
    filter: brightness(1.1);
  }
`;

export const SecondaryButton = styled.button`
  background: ${props => props.theme.colors.buttonSecondary};
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    filter: brightness(0.98);
  }
`;
