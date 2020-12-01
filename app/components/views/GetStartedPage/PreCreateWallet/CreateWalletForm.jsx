import { FormattedMessage as T, defineMessages } from "react-intl";
import { TextInput } from "inputs";
import { KeyBlueButton, InvisibleButton, ToggleSwitch } from "buttons";
import { Tooltip } from "shared";
import { NewSeedTabMsg, RestoreTabMsg } from "../messages";
import { classNames } from "pi-ui";
import styles from "../GetStarted.module.css";

const messages = defineMessages({
  namePlaceholder: {
    id: "createwallet.walletname.placehlder",
    defaultMessage: "Choose a Name"
  },
  nameTooltip: {
    id: "createwallet.walletname.tooltip",
    defaultMessage:
      "The name is used to identify your wallet. Restoring a wallet does not require the name to match the previous wallet name."
  },
  watchOnlyTooltip: {
    id: "createwallet.watchonly.tooltip",
    defaultMessage:
      "You’ll not be able to spend any DCR associated with that wallet. It is used only to view the balance and monitor the wallet's transaction activity"
  },
  trezorTooltip: {
    id: "createwallet.trezor.tooltip",
    defaultMessage: "Trezor is a hardware wallet."
  },
  masterPubKey: {
    id: "createwallet.walletpubkey.placeholder",
    defaultMessage: "Master Pub Key"
  },
  masterPubkeyError: {
    id: "createwallet.walletWatchOnly.error",
    defaultMessage: "Invalid Master Pubkey"
  },
  dupeNameError: {
    id: "createwallet.dupeWalletName.error",
    defaultMessage: "Please choose an unused wallet name"
  }
});

const AdvancedOptions = ({
  options,
  isWatchingOnly,
  pubKey,
  onChangePubKey,
  failedAttemptPubKey,
  pubKeyError,
  pubKeyPlaceholder,
  invalidPubKeyMessage
}) => (
  <>
    <div className={styles.daemonRow}>
      <div className={styles.advancedOptionsLabel}>
        <T id="createwallet.advancedoptions" m="Advanced Options" />:
      </div>
    </div>
    {options.map((option, key) => (
      <div className={styles.daemonRow} key={key}>
        <div className={styles.daemonLabel}>
          {option.description ? (
            <Tooltip text={option.description}>{option.label}</Tooltip>
          ) : (
            option.label
          )}
        </div>
        <div className={styles.daemonInput}>
          <div className={styles.walletSwitch}>
            <ToggleSwitch
              enabled={option.isEnabled}
              onClick={option.onClick}
              enabledText={option.enabledText}
              notEnabledText={option.disabledText}
            />
            {option.extra}
          </div>
        </div>
      </div>
    ))}
    {isWatchingOnly && (
      <div className={styles.daemonRow}>
        <div className={styles.daemonLabel}>
          <T id="createwallet.walletmasterpubkey.label" m="Master Pub Key" />
        </div>
        <div className={styles.daemonLongInput}>
          <TextInput
            required
            value={pubKey}
            onChange={(e) => onChangePubKey(e.target.value)}
            placeholder={pubKeyPlaceholder}
            showErrors={failedAttemptPubKey || pubKeyError}
            invalid={pubKeyError}
            invalidMessage={invalidPubKeyMessage}
          />
        </div>
      </div>
    )}
  </>
);

const CreateWalletForm = ({
  createWallet,
  hideCreateWalletForm,
  newWalletName,
  walletNameError,
  onChangeCreateWalletName,
  hasFailedAttemptName,
  hasFailedAttemptPubKey,
  intl,
  isWatchingOnly,
  walletMasterPubKey,
  toggleWatchOnly,
  onChangeCreateWalletMasterPubKey,
  masterPubKeyError,
  isTrezor,
  toggleTrezor,
  isPrivacy,
  toggleIsPrivacy,
  onShowTrezorConfig,
  isCreateNewWallet,
  creatingWallet
}) => {
  const isRestoreWallet = !isCreateNewWallet;
  return (
    <>
      <div className={styles.newWalletTitleArea}>
        <div
          className={classNames(
            styles.walletIconSmall,
            isCreateNewWallet ? styles.createnew : styles.restore
          )}
        />
        <div className={styles.newWalletTitle}>
          {isCreateNewWallet ? <NewSeedTabMsg /> : <RestoreTabMsg />}
        </div>
      </div>
      <div className={styles.daemonRow}>
        <div className={styles.daemonLabel}>
          {isRestoreWallet ? (
            <Tooltip text={intl.formatMessage(messages.nameTooltip)}>
              <T id="createwallet.walletname.label" m="Wallet Name" />
            </Tooltip>
          ) : (
            <T id="createwallet.walletname.label" m="Wallet Name" />
          )}
        </div>
        <div className={styles.daemonInput}>
          <TextInput
            required
            invalid={walletNameError}
            invalidMessage={intl.formatMessage(messages.dupeNameError)}
            value={newWalletName}
            onChange={(e) => onChangeCreateWalletName(e.target.value)}
            placeholder={intl.formatMessage(messages.namePlaceholder)}
            showErrors={hasFailedAttemptName}
          />
        </div>
      </div>
      {isRestoreWallet && (
        <AdvancedOptions
          options={[
            {
              label: <T id="createwallet.walletOnly.label" m="Watch only" />,
              description: intl.formatMessage(messages.watchOnlyTooltip),
              isEnabled: isWatchingOnly,
              onClick: toggleWatchOnly,
              enabledText: <T id="watchOnly.enabled" m="Watch Only" />,
              disabledText: <T id="watchOnly.disabled" m="Normal" />
            },
            {
              label: <T id="createwallet.isTrezor.label" m="Trezor" />,
              isEnabled: isTrezor,
              description: intl.formatMessage(messages.trezorTooltip),
              onClick: toggleTrezor,
              enabledText: (
                <T id="createWallet.restore.trezor.enabled" m="Enabled" />
              ),
              disabledText: (
                <T id="createWallet.restore.trezor.disabled" m="Disabled" />
              ),
              extra: (
                <span onClick={onShowTrezorConfig} className={styles.whatsnew}>
                  <T id="createWallet.isTrezor.setupLink" m="(setup device)" />
                </span>
              )
            },
            {
              label: <T id="privacy.label" m="Privacy" />,
              isEnabled: isPrivacy,
              onClick: toggleIsPrivacy,
              enabledText: <T id="privacy.label" m="Privacy" />,
              disabledText: <T id="watchOnly.disabled" m="Normal" />
            }
          ]}
          isWatchingOnly={isWatchingOnly}
          failedAttemptPubKey={hasFailedAttemptPubKey}
          pubKey={walletMasterPubKey}
          onChangePubKey={onChangeCreateWalletMasterPubKey}
          pubKeyError={masterPubKeyError}
          invalidPubKeyMessage={intl.formatMessage(messages.masterPubkeyError)}
          pubKeyPlaceholder={intl.formatMessage(messages.masterPubKey)}
        />
      )}
      <div className={styles.daemonRow}>
        <KeyBlueButton onClick={createWallet}>
          {creatingWallet ? (
            <T id="wallet.creating.button" m="Creating" />
          ) : (
            <T id="wallet.create.button" m="Continue" />
          )}
        </KeyBlueButton>
        <InvisibleButton onClick={hideCreateWalletForm}>
          <T id="advancedStartup.cancel" m="Cancel" />
        </InvisibleButton>
      </div>
    </>
  );
};

export default CreateWalletForm;
