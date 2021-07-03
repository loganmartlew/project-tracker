import theme from '@styles/theme';
import styled from 'styled-components';

export const ProjectContainer = styled.article`
  padding: 1.5rem;
  min-width: 254px;
  max-width: 350px;
  border-radius: 15px;
  background-color: ${props => props.theme.color_primary};
`;

export const ProjectHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  margin-bottom: 0.5em;
  font-size: 1.3rem;
`;

export const ProjectName = styled.h3`
  width: max-content;
  transition: 100ms;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color_primary_light};
  }
`;

export const ProjectDescription = styled.p`
  margin-bottom: 2em;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 2em;
`;

export const StatusBadge = styled.p`
  padding: 0.2em 0.6em;
  border-radius: 500px;
  background-color: ${props => props.theme.color_primary_light};
`;
