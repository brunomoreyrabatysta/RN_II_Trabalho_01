import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

type IProps = {
  isLoading: boolean;
  backgroundColor: string;
  loadingColor: string;
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ActivityIndicatorWrapper = styled.View<{backgroundColor: string}>`
  background-color: ${props => props.backgroundColor};
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = (props: IProps) => (
  <Modal transparent={true} animationType="fade" visible={props.isLoading}>
    <Container>
      <ActivityIndicatorWrapper backgroundColor={props.backgroundColor}>
        <ActivityIndicator
          animating={props.isLoading}
          color={props.loadingColor}
          size="large"
        />
      </ActivityIndicatorWrapper>
    </Container>
  </Modal>
);