import { ReactComponent as PokeballSVG } from "assets/icon/pokeball.svg";
import styled from "@emotion/styled";

type PokeballProps = {
  $enabled: boolean;
};

export const Pokeball = styled(PokeballSVG)<PokeballProps>`
  #poke-top {
    fill: ${(props) => (props.$enabled ? "#ee5281" : "#FFFFFF")};
  }

  #poke-bottom {
    fill: #ffffff;
  }

  #poke-border {
    fill: ${(props) => (props.$enabled ? "#777777" : "#FFFFFF")};
  }

  #poke-circle {
    fill: #ffffff;
  }
`;
