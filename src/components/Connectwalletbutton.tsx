import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";

// 👇 replace "...." with your real Client ID
const client = createThirdwebClient({
  clientId: "YOUR_REAL_THIRDWEB_CLIENT_ID",
});

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "x"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

export default function ConnectWalletButton() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{ size: "compact" }}
    />
  );
}
