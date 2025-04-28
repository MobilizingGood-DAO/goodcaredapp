import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

import { inAppWallet, createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [
  inAppWallet({
    auth: {
      options: ["x"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

function Example() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{ size: "compact" }}
    />
  );
}
