import { Container, Content } from "./styles"

import logoImg from "../../assets/logo.svg"

interface HeaderProps {
  onOpenNewTransacationModal: () => void
}

export function Header({ onOpenNewTransacationModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />

        <button type="button" onClick={onOpenNewTransacationModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}
