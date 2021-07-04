import styled from 'styled-components';

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 25px;
  background-color: white;
`;

export const ModalText = styled.p`
  max-width: 315px;
  word-wrap: break-word;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 1em;
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.5rem;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color_primary};
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
`;

export const Name = styled.h2`
  display: flex;
  align-self: center;
  gap: 0.2em;
  font-size: 2rem;

  @media only screen and (max-width: 720px) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

export const ProjectButtons = styled.div`
  display: flex;
  gap: 1em;
`;

export const Description = styled.p``;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const StatusBadge = styled.p`
  padding: 0.2em 0.6em;
  border-radius: 500px;
  background-color: ${props => props.theme.color_primary_light};
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
`;

export const Date = styled.span``;

export const LinksSection = styled.section`
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;
`;

export const MilestonesSection = styled.section``;

export const MilestonesTop = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color_primary};
`;

export const MilestonesHeading = styled.h3`
  margin-bottom: 0.6em;
  font-weight: 500;
`;

export const MilestoneList = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  margin-top: 1.5em;
`;

export const Milestone = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  flex-grow: 1;
  flex-basis: 1;
  padding: 1rem 1.5rem;
  width: 350px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color_primary};
`;

interface MilestoneBadgeProps {
  complete: boolean;
}

export const MilestoneBadge = styled.span<MilestoneBadgeProps>`
  padding: 0.2em 0.7em;
  width: max-content;
  border-radius: 500px;
  background-color: ${({ complete, theme }) =>
    complete ? theme.color_success : theme.color_danger};
`;
