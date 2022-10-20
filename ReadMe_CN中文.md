# Empiric网络 (Empiric Network)

This is the repository for the zk-native Empiric Network Oracle, which is already live on Starknet.

这是零知识证明原生的Empiric网络预言机的存储库，它已在 Starknet 上运行。

## 关于 (About)

You can read more about the Empiric Network [here](https://docs.empiric.network) and you can see the frontend in action [here](https://empiric.network).

您可以阅读更多关于Empiric网络 [点击此处](https://docs.empiric.network) 的信息，并且可以查看正在运行的前端 [点击此处](https://empiric.network)。

### 概览 (Overview)

![Empiric Network Architecture](/assets/Empiric-Architecture.png)

The Empiric Network consists of three smart contracts. The first is the Publisher Registry, which is the most static. This is designed to be updated extremely infrequently because it's state should be permanent (each publisher and their address). The second is the Oracle Controller, which is also designed to be updated only as frequently as absolutely necessary. This is the contract which protocols use, and the one to which publishers publish. In the background, it coordinates the Publisher Registry and the Oracle Implementation(s). The third contract type is Oracle Implementation which contains the logic for storing and aggregating specific key/value data streams. Oracle Implementations can be updated frequently by simply adding them to the Oracle Controller's list of implementation addresses. While there can be many Oracle Implementations to all of which the Oracle Controller write data being published to it, there can be only one primary Oracle Implementation, which is where the Oracle Controller fetches results from when other smart contracts ask it to.

Empiric网络由三个智能合约组成。第一个是发布者注册表，它也是最静态的。目的是维持一个极不频繁地更新，因为它的状态应该是永久的(每个发布者及其地址)。第二个是预言机控制器，它也被设计为仅在绝对必要时才更新。这是协议使用的合约，也是发布者发布的对象。在后台，它协调发布者注册表和预言机实现。第三种合约类型是预言机实现，它包含用于存储和聚合特定键/值数据流的逻辑。只需将预言机实现添加到预言机控制器的实现地址列表中，即可频繁更新预言机实现。虽然可以有许多预言机实现-预言机控制器将数据发布到所有这些实现中-但只能有一个主要的预言机实现，即是预言机控制器在其他智能合约要求时，从中获取结果的地方。

### 部署合约 (Deployed Contracts)

On testnet, the contracts are deployed at the following addresses:

在测试网, 合约被部署到以下地址

| 合约 Contract | Voyager | 地址 Address |
| --- | ----------- | --- |
| 发布者注册表 PublisherRegistry | [Link](https://goerli.voyager.online/contract/0x0743e8140a56d5ee9ed08eb77a92bcbcf8257da34ab2a2ee93110709e61ab11a) | 0x0743e8140a56d5ee9ed08eb77a92bcbcf8257da34ab2a2ee93110709e61ab11a |
| 预言机控制器 OracleController | [Link](https://goerli.voyager.online/contract/0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4) | 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4 |
| (主要)预言机实现 OracleImplementation (primary) | [Link](https://goerli.voyager.online/contract/0x05a88457f9292d0596090300713e80724631024e7a92989302d458271c98cad4) | 0x05a88457f9292d0596090300713e80724631024e7a92989302d458271c98cad4 |

## 安装 (Setup)

After you have cloned the repository, run the following commands to set up the repo:

克隆安装库后，运行以下命令：

1. `pip install -r requirements.txt`
2. `pip install -r dev-requirements.txt`
3. `pip install -e empiric-package`
4. `curl -L https://raw.githubusercontent.com/software-mansion/protostar/master/install.sh | bash`

# 用法 (Usage)

## 在本地开发合约 (Developing Contracts Locally)

To ensure your IDE settings and contracts compile correctly, make sure to run any Empiric code after activating your Cairo virtual environment.

为确保您的 IDE 设置和合约正确编译，请确保在激活您的 Cairo 虚拟环境后再运行任何 Empiric 代码。

Then add this line of code to your shell profile:

然后将这行代码添加到您的 shell 配置文件中：

```code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}```

After doing so, open all subsequent windows of the repo from the CLI, using the `code .` command, for correct formatting.

完成此操作后，从 CLI 中打开所有后续的 repo 窗口，使用 `code .` 命令进行正确的格式设置。

## 在本地从已部署合约推送数据 (Pulling Data Locally from Feeds in Deployed Contracts)

Make sure you set the following environment variables to be able to interact with the deployed contract:

确保您设置了以下环境变量，才能够与已部署的合约进行交互：

```bash
STARKNET_NETWORK=alpha-goerli
```

Then you can use the Starknet CLI to invoke the contract. For instance to get the price of ETH/USD first calculate the key by converting the string to the UTF-8 encoded felt `28556963469423460` (use `str_to_felt("eth/usd")` util in `empiric.core.utils`). Then run the following commands, replacing `<ORACLE_CONTROLLER_ADDRESS>` with the address of the Oracle Controller contract (see above):

然后你可以使用 Starknet CLI 来调用合约。例如，要获取 ETH/USD 的价格，首先通过将字符串转换为 UTF-8 编码的毡 `28556963469423460` 来计算密钥(使用 `empiric.core.utils` 中的 `str_to_felt("eth/usd")` ) .然后运行以下命令，将 `<ORACLE_CONTROLLER_ADDRESS>` 替换为 预言机控制器合约的地址(见上文)：

```bash
starknet call --address <ORACLE_CONTROLLER_ADDRESS> --abi contracts/abi/OracleController.json --function get_value --inputs 28556963469423460
```

## 从已部署合约推送数据Publishing Data to a Feed in a Deployed Contract

The recommended way to publish data is to use the `empiric-publisher` Docker image which has the Empiric SDK baked in, which includes the most up to date contract addresses and the `EmpiricPublisherClient`. You just need to create a Python script that fetches the data and then publishes it via the `EmpiricPublisherClient.publish` method. See the setup in `sample-publisher/coinbase` for an example. With the setup there (and an additional file `.secrets.env` with the secret runtime args), we would just have to run:

推荐的发布数据方式是使用 `empiric-publisher` Docker 镜像，它包含 Empiric SDK，其中又包括最新合约地址和 `EmpiricPublisherClient`。您只需要创建一个获取数据的 Python 脚本，然后即可通过 `EmpiricPublisherClient.publish` 方法将其发布。有关示例，请参阅 `sample-publisher/coinbase` 中的设置。通过那里的设置(以及带有秘密运行时参数的附加文件`.secrets.env`)，我们只需要运行：

```bash
docker build sample-publisher/coinbase/ -t coinbase
docker run --env-file sample-publisher/coinbase/.secrets.env coinbase
```

## 运行测试 (Running Tests)

To run tests, simply run `pytest .` from the project root.

要运行测试，主需要从项目根文件运行 `pytest .` 

## 部署合约 (Deploying Contracts)

To deploy these contracts on Goerli testnet (e.g. to test behavior outside of the production contract), first create a private/public admin key pair for admin actions with both the publisher registry and the Oracle Controller (use `get_random_private_key` and `private_to_stark_key` in `starkware.crypto.signature.signature`).

要在 Goerli 测试网上部署这些合约(例如，测试生产合约之外的行为)，首先为发布者注册表和 预言机控制器的管理操作创建一个私密/公共管理密钥对(使用 `get_random_private_key` 和 `private_to_stark_key` `starkware.crypto.signature.signature`)。

Then run the following commands, replacing `<ADMIN_PUBLIC_KEY>` with the public key you generated in the previous step. Replace `<ADMIN_ADDRESS>`, `<PUBLISHER_REGISTRY_ADDRESS>` and `<ORACLE_CONTROLLER_ADDRESS>` with the addresses of the first, second and third contract deployed in the steps below, respectively.

然后运行以下命令，将 `<ADMIN_PUBLIC_KEY>` 替换为您在上一步中生成的公钥。将 `<ADMIN_ADDRESS>`、`<PUBLISHER_REGISTRY_ADDRESS>` 和 `<ORACLE_CONTROLLER_ADDRESS>` 分别替换为以下步骤中部署的第一个、第二个和第三个合约的地址。

```bash
export STARKNET_NETWORK=alpha-goerli
protostar build
cp contracts/build/OracleController_abi.json empiric-ui/src/abi/OracleController.json
starknet deploy --contract contracts/build/Account.json --inputs <ADMIN_PUBLIC_KEY>
starknet deploy --contract contracts/build/Account.json --inputs <PUBLISHER_PUBLIC_KEY>
starknet deploy --contract contracts/build/PublisherRegistry.json --inputs <ADMIN_ADDRESS>
starknet deploy --contract contracts/build/OracleController.json --inputs <ADMIN_ADDRESS> <PUBLISHER_REGISTRY_ADDRESS> <KEY_DECIMALS>
starknet deploy --contract contracts/build/OracleImplementation.json --inputs <ORACLE_CONTROLLER_ADDRESS>
```

Finally, you must add the Oracle Implementation to the Controller. You can use the `add_oracle_implementation` method of the `EmpiricAdminClient` class in `empiric.admin.client`. For instance, after replacing `<ORACLE_IMPLEMENTATION_ADDRESS>` with the actual address you would run the `add_oracle_implementation.py` script in sample-publisher/utils. After replacing the Publisher Registry, run the `register_all_publishers.py` in the same location.

最后，您必须将预言机实现添加到控制器。您可以使用 `empiric.admin.client` 中的 `EmpiricAdminClient` 类的 `add_oracle_implementation` 方法。例如，将 `<ORACLE_IMPLEMENTATION_ADDRESS>` 替换为实际地址后，您将在 sample-publisher/utils 中运行 `add_oracle_implementation.py` 脚本。替换发布者注册表后，在同一位置运行`register_all_publishers.py`。

# 发布流 (Release Flow)

The release flow depends on which parts of the code base changed. Below is a mapping from which parts of the code base changed to how to release the updates.

发布流取决于代码库的哪些部分发生了变化。下面是从代码库的哪些部分更改到如何发布更新的映射。

## 合约 (Contracts)

First, compile and then redeploy the contract(s) that have changed. See the section above "Deploying Contracts" for details.

首先，编译然后重新部署已更改的合约。有关详细信息，请参阅上面的“部署合约”部分。

Then, depending on which contracts were redeployed, you have to take further steps:

然后，根据重新部署的合约，您需要：

- If it was merely the oracle implementation contract that was updated, add it to the Oracle Controller's oracle implementations so that it can run in shadow mode. Finally, you need to set that oracle implementation as the primary one by using the `set_primary_oracle` method of the `EmpiricAdminClient` class in `empiric.admin.client`.

  如果只是更新了预言机实现合约，请将其添加到预言机控制器的预言机实现中，以便它可以在影子模式下运行。最后，您需要使用 `empiric.admin.client` 中的 `EmpiricAdminClient` 类的 `set_primary_oracle` 方法将该预言机实现设置为主要实现。


- If oracle registry is updated, you will first have to pull existing publishers and keys and write them to the new publisher registry. It is probably easiest to do this off-chain, by using the getter functions on the old publisher registry and then using the admin key to effectively re-register all the publishers in the new register. You must also update the `PUBLISHER_REGISTRY_ADDRESS` variable in `empiric.core.config` and then follow the steps to release a new version of the Empiric package. Finally, you'll have to update the Oracle Controller's Publisher Registry address which you can do using the `update_publisher_registry_address` method of the `EmpiricAdminClient` class in `empiric.admin.client`.

  如果更新了预言机注册表，您首先必须提取现有的发布者和密钥，并将它们写入新的发布者注册表。再通过使用旧发布者注册表上的 getter 函数，然后使用管理员密钥有效地重新注册新注册表中的所有发布者，这可能是最简单的链下操作。您还必须更新 `empiric.core.config` 中的 `PUBLISHER_REGISTRY_ADDRESS` 变量，然后按照步骤发布新版本的 Empiric 包。最后，您必须更新预言机控制器的发布者注册表地址，您可以使用 `empiric.admin.client` 中的 `EmpiricAdminClient` 类的 `update_publisher_registry_address` 方法来完成。

- Finally, if the Oracle Controller is updated, you'll have to update the address in empiric-package (`empiric.core.config`), in this README (above), in the sample consumer (`contracts/sample_consumer/SampleConsumer.cairo`) and in empiric-ui (`src/services/address.service.ts`). Then you'll have to follow the release processes for those components. Finally, make sure to coordinate with protocols to update their references.

  最后，如果更新了预言机控制器，您必须更新empiric包 (`empiric.core.config`)、在本自述文件(上述)、在示例使用者 (`contracts/sample_consumer/SampleConsumer.cairo`)和empiric-ui(`src/services/address.service.ts`)。然后，您必须遵循这些组件的发布流程。最后，请确保与协议协调，确保后续更新引用。


## Empiric包 (Empiric Package)

To create a new version, just navigate into `empiric-package` and run `bumpversion <part>` (where `<part>` is major, minor or patch). Make sure to run `git push --tags` once you've done that.

要创建新版本，只需导航到 `empiric-package` 并运行 `bumpversion <part>`(其中 `<part>` 是主要、次要或补丁)。确保在完成后运行 `git push --tags`。

This new version will be released automatically along with the Docker base image when a branch is merged to master.

当分支合并到 master 时，这个新版本将与 Docker 基础镜像一起自动发布。

## Empiric UI

Netlify will automatically deploy previews on push if a pull request is open and will redeploy the main website on merge to master.

如果拉pull请求开放，Netlify 将在推送时自动部署预览，并将在合并到主支时重新部署主网站。

## Empiric发布者Docker基础镜像 (Empiric Publisher Docker Base Image)

Run the following commands to build a new base image for empiric-publisher locally. Use the `latest` tag for testing:

运行以下命令在本地为Empiric发布者构建一个新的基础镜像。使用 `latest` 标签进行测试：

```bash
docker build . -t 42labs/empiric-publisher
docker push 42labs/empiric-publisher:latest
```

empiric-publisher base images are versioned together with the Empiric Python package because when the Empiric package is updated, a new Docker image should always be released. If the Docker image needs to be updated for a reason other than a new Empiric package release, the release flow will overwrite the Empiric package. A new Docker image is automatically tagged with the appropriate version and pushed to Dockerhub by the GHA release flow, so no need to do this locally.

Empiric发布者基础镜像与 Empiric Python 包一起进行版本管理，因为当 Empiric 包更新时，应该总是发布一个新的 Docker 镜像。如果 Docker 映像需要更新的原因不是新的 Empiric 包发布，则发布流程将覆盖 Empiric 包。新的 Docker 映像会自动标记适当的版本，并通过 GHA 发布流程推送到 Dockerhub，因此无需在本地执行此操作。

## 样本发布者 (Sample Publisher)

If your changes involve changes to the fetching and publishing code, navigate to `publisher/manage-deployment` and run `scp -i LightsailDefaultKey-us-east-2.pem -r ../sample-publisher/all ubuntu@<IP_ADDRESS>:` to copy over the code again, where `IP_ADDRESS` is the IP address of the Lightsail instance. The existing instance will automatically rebuild the docker image using that new code.

如果您的更改涉及对获取和发布代码的更改，请导航到 `publisher/manage-deployment` 并运行 `scp -i LightsailDefaultKey-us-east-2.pem -r ../sample-publisher/all ubuntu@<IP_ADDRESS >:` 再次复制代码，其中 `IP_ADDRESS` 是 Lightsail 实例的 IP 地址。现有实例将使用该新代码自动重建 docker 映像。

If your changes are to the cron command, it is easiest to ssh into the instance and edit the cron command there directtly using `crontab -e`.

如果您对 cron 命令进行了更改，最简单的方法是通过 ssh 进入实例并使用 `crontab -e` 直接在其中编辑 cron 命令。

# 暂存环境 (Staging Environment)

## 隔离环境 (Separate Environment)

We have a staging environment set up in order to be able to test our code without affecting the production environment.

我们设置了一个暂存环境，以便能够在不影响生产环境的情况下测试代码。

On testnet, the staging contracts are deployed at the following addresses:

在测试网上，暂存合约部署在以下地址：



| 合约 Contract | Voyager | 地址 Address |
| --- | ----------- | --- |
| 发布者注册表 PublisherRegistry | [Link](https://goerli.voyager.online/contract/0x0743e8140a56d5ee9ed08eb77a92bcbcf8257da34ab2a2ee93110709e61ab11a) | 0x051949605ab53fcc2c0adc1d53a72dd0fbcbf83e52399a8b05552f675b1db4e9 |
| 预言机控制器 OracleController | [Link](https://goerli.voyager.online/contract/0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4) | 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4 |
| (主要)预言机实现 OracleImplementation (primary) | [Link](https://goerli.voyager.online/contract/0x05a88457f9292d0596090300713e80724631024e7a92989302d458271c98cad4) | 0x05a88457f9292d0596090300713e80724631024e7a92989302d458271c98cad4 |

The admin contract is identical to the one used in production. Staging has a separate Publisher Registry, so accounts registered in production will not be registered there. The Empiric publisher account that is registered is located at 3251373723367219268498787183941698604007480963314075130334762142902855469511.

管理合约与生产中使用的合约相同。 暂存有一个单独的发布者注册表，因此在生产中注册的帐户不会在那里注册。已注册的 Empiric 发布者帐户位于 3251373723367219268498787183941698604007480963314075130334762142902855469511。

The main part of our CI setup that uses the staging environment is the update prices GHA.

我们使用暂存环境的 CI 设置的主要部分是更新价格 GHA。

## 影子模式的暂存 (Staging in Shadow Mode)

Sometimes it is important to test how contracts function in the real world. We can do that for Oracle Implementations, by running them in shadow mode.

有时测试合约在现实世界中的运作方式很重要。我们可以通过在影子模式下运行预言机实现来做到这一点。

In order to run an Oracle Implementation in shadow mode, first deploy the Oracle Implementation contract. Then, run the `add_oracle_implementation.py` script in `publisher/utils` with the address from the new Oracle Implementation. The new contract is now in shadow mode, i.e. it receives updates (writes) from the Oracle Controller, but is not used to answer queries (reads). You can read from the new Oracle Implementation contract directly in order to test the new logic.

为了在影子模式下运行预言机实施，首先部署预言机实施合约。然后，使用来自新预言机实现的地址，运行 `publisher/utils` 中的 `add_oracle_implementation.py` 脚本。新合约现在处于影子模式，即它从预言机控制器接收更新(写入)，但不用于回答查询(读取)。您可以直接读取新的预言机实施合约来测试新逻辑。

If the new Oracle Implementation has passed testing and is ready to be promoted to the primary Oracle Implementation (the one used for answering queries), run the `set_primary_oracle_implementation.py` script in `publisher/utils` with the address from the new Oracle Implementation. Once that is complete and the new system is up and running, you can retire the old Oracle Implementation using the `deactivate_oracle_implementation.py` script located in the same directory.

如果新的预言机实现已通过测试,并准备好升级为主要的预言机实现(即用于回答查询的那个)，请使用来自新预言机实现的地址，运行 `publisher/utils` 中的 `set_primary_oracle_implementation.py` 脚本。一旦完成并且新系统启动并运行，您可以使用位于同一目录中的 `deactivate_oracle_implementation.py` 脚本停用旧的预言机实施。
