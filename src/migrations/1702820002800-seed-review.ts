import { MigrationInterface, QueryRunner } from "typeorm"

const user = [
    {
        "id": "8ae6d964-71e0-4557-a58a-aabb1280cb61"
    },
    {
        "id": "3d1cbc26-c029-4b22-8571-14c4b382c2ac"
    },
    {
        "id": "9b582887-0142-462a-a54c-03a7acdf8591"
    },
    {
        "id": "d90884da-0ca7-4e3b-aef0-385136be0f73"
    },
    {
        "id": "a89940c8-cde0-4b50-aacc-0f8a76f0c8f5"
    },
    {
        "id": "d94bf2b9-fb34-4628-832a-93c482d28dd0"
    },
    {
        "id": "b62eee40-3d19-4dde-9cef-3f7354786328"
    },
    {
        "id": "ec476ed5-3697-439a-bf30-67469789dc91"
    },
    {
        "id": "b392dce4-cbf2-40cc-bc9d-7aec7574a3bb"
    },
    {
        "id": "485efbaa-e1e4-49fa-b22b-2ba10d588a40"
    },
    {
        "id": "9d1d2d84-f285-472e-90cc-cf7a3cf3a74f"
    },
    {
        "id": "0b4782da-600b-404c-97da-5ba7f9f7350b"
    },
    {
        "id": "160b6f20-b2db-4ad5-939c-e76ad74b1551"
    },
    {
        "id": "6eaa3b06-b36d-4548-a70d-e741cbb1f5db"
    },
    {
        "id": "92433c38-e5f3-42f1-8849-6a82ac3830df"
    },
    {
        "id": "a73a567b-5ecb-4733-9e27-24f4320a93c6"
    },
    {
        "id": "bbfd138d-6703-421d-9bf6-bd65c9366849"
    },
    {
        "id": "8540dcb1-9cb9-4da3-aa36-bb37e7483e75"
    },
    {
        "id": "32d8d46f-6683-4753-8e44-9398f67110c6"
    },
    {
        "id": "cb86e3c1-253c-4236-a424-8a20164ac7f3"
    },
    {
        "id": "6a8b95f4-afe0-4f22-ae1d-e5c6688bab1f"
    },
    {
        "id": "31d96e5c-ecc0-4ce8-a95a-10bd969faa48"
    },
    {
        "id": "6e1bce1e-ad5a-48b2-8c88-1b3caef244e0"
    },
    {
        "id": "3b5586f4-628a-4d11-885c-810fb463e5ad"
    },
    {
        "id": "b97037f0-b1fc-4662-a0c7-c92ae902c1a4"
    },
    {
        "id": "6b5f334e-7a44-4dbd-bace-0b668e4668b5"
    },
    {
        "id": "9b775485-5b73-4658-aa58-c0477c546674"
    },
    {
        "id": "770257e5-1a81-474e-87e9-16fcbb4e88a6"
    },
    {
        "id": "ea47b7e1-f77e-42fe-a454-e7fd8e2d6406"
    },
    {
        "id": "fb4cde56-c3ee-4872-9e9c-5f9b4790c36d"
    },
    {
        "id": "3fef922b-99a4-4d3e-a5fe-c5e685ca9159"
    },
    {
        "id": "7f18c17b-c2d2-49f7-a7aa-cf41580443d6"
    },
    {
        "id": "e3dc7028-3e39-4a10-a4b0-f2d8b59dec55"
    },
    {
        "id": "480736e1-e916-40d6-8075-af2d0499babd"
    },
    {
        "id": "504a195b-e3c2-48bb-9d76-dcd602040227"
    },
    {
        "id": "29edb446-24e5-4837-b027-87bc9f9418db"
    },
    {
        "id": "22898546-1fff-463f-9738-fcb42c16321c"
    },
    {
        "id": "bbbf01bc-22d4-4eb2-a243-5b0a37b098b1"
    },
    {
        "id": "b0bb383e-6cb1-4cf5-aac7-9577e078241b"
    },
    {
        "id": "fc940199-3102-4ac1-88da-8bec7a762dac"
    },
    {
        "id": "7cd8092a-7b66-486e-8167-78d36e6314c4"
    },
    {
        "id": "c4bc9b40-6054-4b51-93c9-2749c5dfd2ef"
    },
    {
        "id": "fb8a6473-6801-455e-a6a2-905f98607c45"
    },
    {
        "id": "9ec05c04-529a-4416-b43d-6f231d0878ea"
    },
    {
        "id": "a3adc2c1-cd22-43bb-a167-4a6db1d70fbd"
    },
    {
        "id": "6fb38c1e-910d-4df4-a50d-c71aa7b1dddb"
    },
    {
        "id": "9f06db6d-aa4d-42ac-92d0-3bf3d965ce8b"
    },
    {
        "id": "82c1b1ae-a21e-4b8a-b8b4-abc1b3144b64"
    },
    {
        "id": "79a6b42b-b40b-4b12-8254-f91edda7043d"
    },
    {
        "id": "820e5bd4-03b7-434f-8c5a-50c5e214404b"
    },
    {
        "id": "c6410c09-bb93-404d-bbf9-04ba93f02a7b"
    },
    {
        "id": "f8869134-c925-4f6e-9580-fd0101535281"
    },
    {
        "id": "146f9ea6-a415-4008-ac9b-913d1b26d8b9"
    },
    {
        "id": "3ec99979-bc8e-4064-87d6-264e470368be"
    },
    {
        "id": "5bc244f6-1352-4f4c-919d-c881a7834aaa"
    },
    {
        "id": "6394b357-8efe-40e1-b010-8d78b4ab5c88"
    },
    {
        "id": "0ba97194-deb3-4e1d-bf23-460766bf7923"
    },
    {
        "id": "1e8e1726-412e-4548-adaa-66a32ba9e464"
    },
    {
        "id": "989214b3-4143-4da0-b493-157fb2a9a4d1"
    },
    {
        "id": "87832b15-75d4-4a0a-8f40-62631138cb3b"
    },
    {
        "id": "7f4769ad-0660-4f74-ba3f-2660f5a27067"
    },
    {
        "id": "7846c6d2-f291-48d6-8126-d9f7678ac02d"
    },
    {
        "id": "6220ead4-003a-440c-b484-de16575270c2"
    },
    {
        "id": "d59eccf0-18d7-4c37-b617-af7f4ce8cd61"
    },
    {
        "id": "d822c5db-cd8c-444d-9b84-c27e39e5f438"
    },
    {
        "id": "19286431-c9f2-4bcd-a1ea-652289988f0b"
    },
    {
        "id": "b9e1183b-03a6-40ea-a41c-1cc872c52f2c"
    },
    {
        "id": "5e208fd9-09eb-430b-ab14-f5f7e14eae2a"
    },
    {
        "id": "055ecb2d-80de-430d-81b0-9015c5e1af69"
    },
    {
        "id": "408ad3d1-5999-4463-850c-37bf9fc5534a"
    },
    {
        "id": "0a37c4a9-9a93-407d-a570-8598da5f8aad"
    },
    {
        "id": "b9b08db5-c94c-4aba-9737-4a2e1ad5974a"
    },
    {
        "id": "378b005d-98d5-4277-936d-91ef12fefde4"
    },
    {
        "id": "6e53971a-af0b-46bf-b301-b4e4c9056135"
    },
    {
        "id": "0b43a07d-2355-462d-94c7-7bda86895970"
    },
    {
        "id": "832197f4-6bb0-4909-9367-2ad1e9b34561"
    },
    {
        "id": "879d4d51-fe5b-415e-ba56-0ebb6911f3c3"
    },
    {
        "id": "3ab2055a-cafe-4cb3-9ee2-45638c5bcce3"
    },
    {
        "id": "6d08181b-8aea-42a2-9aba-37de5b83b4a6"
    },
    {
        "id": "7abe9676-34f8-4e35-90de-30081a704d72"
    },
    {
        "id": "304421e5-589b-4236-8ad4-42e7aeadb474"
    },
    {
        "id": "5c7605e4-09cb-41bf-85ea-95f0b8b5a201"
    },
    {
        "id": "6cc9214a-91dc-4f96-a0d0-5b52cebbe6e9"
    },
    {
        "id": "81919153-29b1-48be-ac39-94ac39405687"
    },
    {
        "id": "fa740a06-ada3-4c0b-90ac-6915babd9353"
    },
    {
        "id": "d525c0e3-d741-48f5-bc38-35e47fdf8714"
    },
    {
        "id": "70573890-195e-42a5-90f8-3b5dbc811c14"
    },
    {
        "id": "4f7b011d-611f-41f2-b11e-88015c77b32c"
    },
    {
        "id": "828896ed-bd6f-4650-a333-6d1386ca90fe"
    },
    {
        "id": "c0518a5f-a69a-466a-bf01-049030ec811e"
    },
    {
        "id": "c0f4a847-4b64-4fe1-9fa1-16d8c5e0143c"
    },
    {
        "id": "3a99738f-bd02-405b-a14e-194372d28343"
    },
    {
        "id": "447dfd0a-a345-4379-8c96-adb2dc9543c7"
    },
    {
        "id": "9aa850b1-ebfc-4f63-92ff-c2874a0c2a3a"
    },
    {
        "id": "14620a9a-7110-4e7e-99e2-f6be3db58bfb"
    },
    {
        "id": "bdfd8840-1533-42bc-85a0-83d307510ac9"
    },
    {
        "id": "372c62a9-6ba4-45c2-9880-3b6da3e9f46b"
    },
    {
        "id": "fe7f6a96-90f1-4789-ae45-8dbe5219ad71"
    },
    {
        "id": "68716ea3-03e9-4171-8a51-7b8b88dec513"
    },
    {
        "id": "7de5b1b3-47a8-4d31-9eb3-b580aaadef6e"
    },
    {
        "id": "b5801bb2-eea8-4a2a-8c4e-d2bf6654a129"
    },
    {
        "id": "b90cf495-4e5b-4be7-85c1-8cf6367e431e"
    },
    {
        "id": "0eae3e24-1b84-4c83-90e2-addf2edc88e7"
    },
    {
        "id": "d6bc1f96-29b0-4d47-9b05-31662895a06f"
    },
    {
        "id": "9b5c5308-a547-4e6c-8a4f-8f20a6bd34c7"
    },
    {
        "id": "e2a3daa5-8587-4e9c-b9a0-16b76dd7aff7"
    },
    {
        "id": "012bd63c-3713-4cfe-8ea4-f86101afa9c6"
    },
    {
        "id": "67bedda9-f645-4e8c-8658-f135f2d2e5ed"
    },
    {
        "id": "54994304-8c41-4812-8741-802bdfd5ef69"
    },
    {
        "id": "3d11b17a-466a-4dd5-a39c-74bfe5fc68c2"
    },
    {
        "id": "6c985f35-7af2-4d19-bacd-390eddc9fc62"
    }
];
const product = [
    {
        "id": "0df9ceba-4a4f-4d17-a4b4-db49160f1984"
    },
    {
        "id": "6ba6478b-f36b-42f1-ae55-531a9fac7d9f"
    },
    {
        "id": "57da71b0-3e4d-42c8-9686-6cc1d9bb7fc3"
    },
    {
        "id": "713ac576-dd6f-4322-83ce-824397087aff"
    },
    {
        "id": "be7ca9e8-3470-4b54-b023-4a8c5956ccef"
    },
    {
        "id": "ec2835b5-e013-4530-9845-2ca13a634874"
    },
    {
        "id": "6de6a0d9-275b-4efc-8953-8ce8dd8a83b6"
    },
    {
        "id": "58ada65d-f60f-4597-9916-527f6cf8b99e"
    },
    {
        "id": "8545973a-b445-44ec-b226-a97d54708654"
    },
    {
        "id": "12a1b5ad-2bee-420c-9a5e-aac8c0d9038b"
    },
    {
        "id": "9b0add3b-8d9a-4534-b891-d1fa902e45fd"
    },
    {
        "id": "5f8fa206-63e1-467a-9cff-0cf8bdab9668"
    },
    {
        "id": "6d65ac99-1e40-4a72-a34f-7d73c25f5c30"
    },
    {
        "id": "eb742cc7-c311-4bf9-a2df-544ba9633c32"
    },
    {
        "id": "2c605321-349e-4afa-9d4a-30fce758fd90"
    },
    {
        "id": "69ea68dc-e78e-43b1-b9c4-1c5eabbebcc1"
    },
    {
        "id": "a149537a-489f-48ef-89b4-1e697cc5cca5"
    },
    {
        "id": "5bb855fa-3fb3-4345-99c5-6bc01543ef4f"
    },
    {
        "id": "3195f265-481b-4150-8983-eb6707d10f18"
    },
    {
        "id": "0a60baf2-8695-42c1-9bf6-84945ee2e516"
    },
    {
        "id": "cdd1ebdf-0577-4526-9182-0f9049fdb2b9"
    },
    {
        "id": "bc020d4d-95d9-4fa1-a43f-6e515ab24820"
    },
    {
        "id": "db14b146-6ee1-46ec-9a57-8620c292ebe3"
    },
    {
        "id": "1ddcf7e2-cb40-42da-9143-6b0c73ba9cce"
    },
    {
        "id": "99d02349-0ef1-49ef-aa3f-146ce0474656"
    },
    {
        "id": "6deb47b7-67ba-4af9-a6f9-3c97c6d9f73f"
    },
    {
        "id": "233cb455-cdd6-4651-8d7e-93abb5bd1e90"
    },
    {
        "id": "e4fb7032-12a1-442c-82b9-1d2e679293fe"
    },
    {
        "id": "71b79519-5aa9-46cc-b23a-704ae68364ce"
    },
    {
        "id": "78f63940-2386-4b2a-8673-93f8488867ab"
    },
    {
        "id": "ee047cb3-8c06-403b-b059-445fe0d42cca"
    },
    {
        "id": "1a202e65-e18c-4c13-a003-dbfc9f69299a"
    },
    {
        "id": "da9041f3-dad5-4661-87b0-22621b840218"
    },
    {
        "id": "cb2129e7-4f9d-4d4e-8390-0ae9bec47b9b"
    },
    {
        "id": "ca84e218-c774-41bd-bdb1-603e9e521971"
    },
    {
        "id": "dd7bed8a-e5d3-4320-a7bc-d11e6399e03a"
    },
    {
        "id": "bebfca62-063a-41d8-9577-0dd6a6553000"
    },
    {
        "id": "6eaf58f6-7306-419b-abf3-5e155b349ec0"
    },
    {
        "id": "61a220e0-dc77-4004-bd27-e9e1ae2019fe"
    },
    {
        "id": "29b4332d-5ed9-4401-b57d-6e4171674c46"
    },
    {
        "id": "9ed673db-b879-4184-a301-f66503a188ed"
    },
    {
        "id": "feb9887c-2650-4ab6-90ba-7b1b76840803"
    },
    {
        "id": "7ca91802-67a4-4b7d-a5b4-67695484f3d1"
    },
    {
        "id": "8c759ac1-5618-4477-90f8-7a17b686d1de"
    },
    {
        "id": "bf204a02-2fea-41e7-b118-cdf5f7fbc807"
    },
    {
        "id": "b021349f-2d71-4df3-9c4a-bf2b3c0d08a7"
    },
    {
        "id": "0e825cce-a8b0-45f9-8c9e-6b8b85496b28"
    },
    {
        "id": "a7b4aa54-0e2f-4760-8fb8-4060d3b5f70b"
    },
    {
        "id": "03459dee-d49c-4de6-87b1-9669776a31ae"
    },
    {
        "id": "11711736-e1ec-476c-84bd-5c344f64836b"
    },
    {
        "id": "eecc9e3a-367a-447e-8950-501df7e6d339"
    },
    {
        "id": "6064acfe-fb75-474a-89ce-d32af09c3ad5"
    },
    {
        "id": "5984be1f-8aea-4166-937b-0da1b2a39199"
    },
    {
        "id": "b5f47475-2b62-475d-9e16-fec145c4b280"
    },
    {
        "id": "a29a4eb9-f7f2-4677-9b5b-c1ab7769c1cd"
    },
    {
        "id": "9fb03046-e641-4216-941c-3e90c3287bcf"
    },
    {
        "id": "93624b67-ea91-4521-9e13-aa587f31a1f6"
    },
    {
        "id": "ee1252c9-0007-404a-8126-8b206adb917f"
    },
    {
        "id": "6585b670-df8b-4966-9991-71c5d6079310"
    },
    {
        "id": "f6c5388f-04d9-4925-9e37-acace5c148a2"
    },
    {
        "id": "75084d82-f63a-448c-9d80-bd66214b67d8"
    },
    {
        "id": "63c42cbc-1908-494b-ae0f-fef0f67ed614"
    },
    {
        "id": "403af760-d1b9-4f74-bc20-50f46a66dc40"
    },
    {
        "id": "2e662afb-c7ea-41ba-869e-b2abff098f79"
    },
    {
        "id": "6d587abf-828c-4ab1-91e8-4fd2efed20ff"
    },
    {
        "id": "cada2f48-8f8c-48fc-8ac4-565c591ff330"
    },
    {
        "id": "45d6fe44-0ed7-4269-917e-7d4580511eef"
    },
    {
        "id": "b9ed9266-46e3-451b-a3d0-5985f214bca9"
    },
    {
        "id": "e177fbcb-2781-4432-a51c-7795dc34fe6a"
    },
    {
        "id": "674fd3f4-599b-41ba-8a49-3b496d080606"
    },
    {
        "id": "3ab0e845-b374-43fb-8c88-4d4857e28d76"
    },
    {
        "id": "c84771cb-7f14-4c3e-94c5-1f1b27d958f0"
    },
    {
        "id": "c5d70c86-0b5c-4fcb-b289-080af40412b2"
    },
    {
        "id": "0674f736-d303-4bb9-aa27-ffc531c933d6"
    },
    {
        "id": "afef832c-2e0d-41c7-8676-570047fd233c"
    },
    {
        "id": "daa6087b-a135-42a4-bee8-9744c4cfead3"
    },
    {
        "id": "3fd4de75-1ed9-40d5-b86d-cb3565bf3240"
    },
    {
        "id": "6f7eff25-3d79-444f-90f5-4c0449d2b5fc"
    },
    {
        "id": "a7f70709-688c-4124-8637-5b5ee5973120"
    },
    {
        "id": "83925ba2-a8bf-4711-bc65-94d322150e75"
    },
    {
        "id": "687e17e0-a9d3-458b-89ff-979c1f81e1a7"
    },
    {
        "id": "ffe899d8-70c0-40a2-acee-12e2815c9d20"
    },
    {
        "id": "b56e996d-2f1b-46f6-998e-c5623eff41e1"
    },
    {
        "id": "652f3251-2b47-45b5-9a15-c0fefe1f51f8"
    },
    {
        "id": "5d492c27-7b00-47b1-aada-a9de0c4ae8ac"
    },
    {
        "id": "3868f141-e7ac-4ffd-82e2-01eec0492f0f"
    },
    {
        "id": "7fa392f4-c783-48f6-ae67-284da2e06eea"
    },
    {
        "id": "13aa2d57-f3f9-4465-b3b1-a4a6cc79fa5f"
    },
    {
        "id": "40e1f33e-6932-4211-9c47-34887394da31"
    },
    {
        "id": "5fe0dc25-55d3-416e-bbf9-87865018bf55"
    },
    {
        "id": "6f7f266e-6223-4e86-9c3e-91b4b1a7f6ca"
    },
    {
        "id": "3627000c-9a9a-4ac0-86d8-f0f8a5109ff2"
    },
    {
        "id": "05ba1155-b5b8-421e-9109-d5424f50c526"
    },
    {
        "id": "3ec3f10d-94e7-418c-8858-c9acc21ef82c"
    },
    {
        "id": "dbd14a15-68a7-4e7a-8235-52d5e88f43bf"
    },
    {
        "id": "1554db84-905e-47d2-a451-088a16ece3ba"
    },
    {
        "id": "e7cb500f-37cf-46c9-b350-98f27080c56a"
    },
    {
        "id": "c99ed4ec-6f06-4713-87b0-b07335bfea0f"
    },
    {
        "id": "dadd9135-f231-44d7-8bf4-60f457536f1a"
    },
    {
        "id": "4bd338e0-f3c2-4366-8ddf-e56b59d496b4"
    },
    {
        "id": "d66a2401-6d3f-4e28-895a-5b7c4733a8ff"
    },
    {
        "id": "d3e1c697-71ac-4a39-a7bc-80bba6da0e24"
    },
    {
        "id": "53394bec-ad82-488f-86f9-23dfb1b5b424"
    },
    {
        "id": "0114a06e-1fb0-4a34-a147-650d8eb1a820"
    },
    {
        "id": "6842d42d-b604-425c-8b6c-ea8d2b32636e"
    },
    {
        "id": "8b71a26c-9d76-4637-9756-576eb1efdfea"
    },
    {
        "id": "1edfe46a-a32d-46ab-9953-0b8e6fbd5783"
    },
    {
        "id": "b2c068ef-1198-479b-b7c9-f7fc43e8ef22"
    },
    {
        "id": "4ad7b9a8-585e-45c4-bfa6-46ca061c2e37"
    },
    {
        "id": "9b518367-ebb7-46f4-8cc5-83db1dbc32ca"
    },
    {
        "id": "32bd3c0b-c2d2-4e38-95b4-735737cc716e"
    },
    {
        "id": "0dd2a07d-eb84-4ca7-8dd9-bb8d72177e12"
    },
    {
        "id": "14fb8858-4692-4f90-bbde-7fcc477a62a3"
    },
    {
        "id": "393aeaee-22c8-4c62-bb25-2f8965fef3ca"
    },
    {
        "id": "bf664bf1-a9c0-4d8d-8bc8-867f5ad7de2a"
    },
    {
        "id": "0eff7b57-4f6f-4ab6-8cfc-fad287a5424e"
    },
    {
        "id": "18f68244-4df7-4a3f-bf9d-1fc79b718b2b"
    },
    {
        "id": "31024fce-583b-4ebc-9c36-8b7bfc070bfb"
    },
    {
        "id": "93d97960-ece1-4281-93fe-5244e62feaed"
    },
    {
        "id": "b9c310dc-e385-4af4-9f1a-194e227d5b1d"
    },
    {
        "id": "13ed6da5-8e86-4f88-859d-9aea77a2bf51"
    },
    {
        "id": "c000d57e-a620-45e4-960b-b5ffb96c621c"
    },
    {
        "id": "fe00547a-668e-4fdf-9a5c-bb18e17824b0"
    },
    {
        "id": "9cc608c8-876d-4b5a-9d0a-d72d49994d71"
    },
    {
        "id": "ccc6fd30-dd3b-412c-9294-aedda7702fbe"
    },
    {
        "id": "2521d0e4-40f5-4bc2-8c68-ba0ad737beca"
    },
    {
        "id": "5a56fe8a-4c0f-4ca8-8815-a3a9170a9ea4"
    },
    {
        "id": "df1df90d-c023-4c4c-bd89-b9b592d57bf6"
    },
    {
        "id": "b2b3b58e-f038-4f58-ae77-6da383461d5e"
    },
    {
        "id": "15ef9fb8-6129-4d7e-80b2-fccb28e6535b"
    },
    {
        "id": "af13c4ef-1025-4913-9249-e107d0ffe054"
    },
    {
        "id": "03e08ec8-0ca7-4b86-b09e-2767f6e50c5b"
    },
    {
        "id": "bd3d5d1e-4fb5-44d3-b755-567b94bcdb8f"
    },
    {
        "id": "e85a65f2-3385-4334-b35f-8c28aaab99ec"
    },
    {
        "id": "a8ec10db-8feb-47bc-b750-1c67f4cde8a5"
    },
    {
        "id": "0fdb40dd-32fa-44e2-a610-063fda1e1d93"
    },
    {
        "id": "015459ab-a3fb-4b7a-9b72-e0dc31fa9db2"
    },
    {
        "id": "3e49d90b-bc83-49da-a99a-f121e4c21cd2"
    },
    {
        "id": "816721d2-cef6-4ba5-bd0f-bdc59bc098b5"
    },
    {
        "id": "c537a9a9-cd62-43ab-ac5b-422bcc438f5d"
    },
    {
        "id": "92988245-0ab5-48c0-90e0-06bc457e32c9"
    },
    {
        "id": "da7a191d-d90f-4d7d-a9f8-e4f580418d5b"
    },
    {
        "id": "ab3b8cc1-2785-4f2c-b71d-cc7b84fb8edd"
    },
    {
        "id": "53dac9c5-6691-42c2-8497-dac42ca14c1e"
    },
    {
        "id": "0df6a0c6-0fed-4583-ba07-f1dd77680311"
    },
    {
        "id": "03ab30e7-218e-4f95-b8ad-874ca203f682"
    },
    {
        "id": "51cbcbb1-2609-4931-a11c-f1f7608e564f"
    },
    {
        "id": "923eac7a-8c2b-4850-9436-acb21854c160"
    },
    {
        "id": "df942668-b74d-4a97-8a1b-dc0614484610"
    },
    {
        "id": "21617554-446a-4c46-bafa-ec1dcdc7dcf9"
    },
    {
        "id": "8ba0006e-bea0-4db1-a244-17d4ee772586"
    },
    {
        "id": "6fed96eb-faa0-490b-96b4-e6dcb104933c"
    },
    {
        "id": "87108e9f-e6cc-4ed6-9e07-718cdfceaaf1"
    },
    {
        "id": "0e7997bf-e893-4041-bf1a-0766191b696d"
    },
    {
        "id": "d1752e9d-f956-4a00-a13f-ca694de64406"
    },
    {
        "id": "27ae764e-713e-4ca7-b06c-e557ff211b32"
    },
    {
        "id": "2ddf7632-b213-4eb5-bafd-5a7f6376d56a"
    },
    {
        "id": "53b8c9c0-4b4b-4252-b457-503c55021ced"
    },
    {
        "id": "206f455c-7f6d-4364-934d-dd753b9b16aa"
    },
    {
        "id": "3417a00a-3661-4040-9762-0dbb54de08a2"
    },
    {
        "id": "bae8cb0c-f0ea-439b-8b4e-a4356b182a52"
    },
    {
        "id": "efdbcdbc-88d4-4b27-8877-40a19867e9c4"
    },
    {
        "id": "97c69043-d26c-4efd-b266-52bb313029f5"
    },
    {
        "id": "99f896c1-facf-4fad-b75b-400eb9c4df19"
    },
    {
        "id": "3ba528b8-8d75-46db-8361-3739a8ddcafa"
    },
    {
        "id": "3ee89257-0348-4637-bb0b-b564c64ff3d2"
    },
    {
        "id": "574af0c9-bcd5-47be-95ab-38c46889d5f5"
    },
    {
        "id": "286789c0-6edb-4a13-87cb-4c0f6fb67f43"
    },
    {
        "id": "48897034-e9cf-4132-9f3c-a14915bd377e"
    },
    {
        "id": "f46b4dce-cfdb-4eb5-8f79-44687ba5ccc4"
    },
    {
        "id": "403b8267-2bcf-4e2a-bfef-0aa261d6e018"
    },
    {
        "id": "ebe41792-fdfd-4c4b-8983-700c97a41c0d"
    },
    {
        "id": "32dc4217-54af-4452-b8b2-34eca057b799"
    },
    {
        "id": "e7abc02f-b9ab-4077-893c-97df68752e90"
    },
    {
        "id": "ce4e4a10-434c-466b-9f1c-f710c9fc25a4"
    },
    {
        "id": "3603f7c3-5998-40c0-a623-c0dbaa148b8d"
    },
    {
        "id": "6f97b1be-bffb-4df5-b339-32811fb37601"
    },
    {
        "id": "b2a4321c-eec2-47e6-9051-6dcb1b256e71"
    },
    {
        "id": "3ae3b104-b0bb-4ea9-b607-5a8c77b47342"
    },
    {
        "id": "83fe2aa6-aa54-4fa3-be2b-b1bc3dfc9e29"
    },
    {
        "id": "9aba0a44-a140-4e95-bb4c-9d9a07a06ae6"
    },
    {
        "id": "53addbb2-17ea-4a61-bd57-8f17eed88c90"
    },
    {
        "id": "beac9532-b056-43cb-9fa7-270b9fb96979"
    },
    {
        "id": "aaa02aa9-ea78-4d88-bf96-c6d4c8962e52"
    },
    {
        "id": "64362741-ff02-4502-b475-ec7726a7f958"
    },
    {
        "id": "a0283873-21c7-4822-8539-fd52c75d8705"
    },
    {
        "id": "70f42377-47cc-4683-8c16-74936f2a01a5"
    },
    {
        "id": "ab070fe1-f308-470d-905e-11ff846c8e5e"
    },
    {
        "id": "fe50f60a-4258-47b9-90de-0a86ae5bd8cd"
    },
    {
        "id": "894526e3-83ef-498b-afc8-7f4b1bc6ef69"
    },
    {
        "id": "69bfd3c2-e82f-4b58-a903-490065bcc32d"
    },
    {
        "id": "5b0b3661-6dc9-4925-b98d-01996ffb28d6"
    },
    {
        "id": "ec3932cc-d80e-4e23-9408-892f4ac583b5"
    },
    {
        "id": "34389b1c-05da-4ee0-9383-58128395c55b"
    },
    {
        "id": "55ec9fa0-bb49-4f03-b578-c22dbc5c6aee"
    },
    {
        "id": "e9bf0639-3abf-4996-9a76-121cb85701f8"
    },
    {
        "id": "a8511666-f2df-41ef-8660-81c442b2974b"
    },
    {
        "id": "4bc3d9f9-8396-4c02-b050-ecb26689ec84"
    },
    {
        "id": "647c8006-952f-45f6-b8fb-56e32ef326be"
    },
    {
        "id": "74d8df36-ff0c-459e-8609-5588e29c2cc4"
    },
    {
        "id": "b0643b93-bfe5-4d78-bb04-4446868bf658"
    },
    {
        "id": "6a4962b0-7086-459f-966b-0a82a8e4d756"
    },
    {
        "id": "65b1a278-8332-476e-a6b0-6aa4154af6fa"
    },
    {
        "id": "eb560500-8668-42b2-8a3b-224272ac4f32"
    },
    {
        "id": "92d83476-7762-4675-9832-6cd91eeb8ef0"
    },
    {
        "id": "3f57e536-427a-4bec-9ecd-c9e63553d40a"
    },
    {
        "id": "2b90c1a2-ff57-4eb7-a938-ee2befc75286"
    },
    {
        "id": "07327061-c2c6-4a6a-9d8e-a4381e277fa8"
    },
    {
        "id": "536fc646-0901-45ea-a4bd-a1b50aee661b"
    },
    {
        "id": "28294b04-8914-484d-8178-a071af47eca1"
    },
    {
        "id": "dcd8e29f-c2bd-473e-8193-1c298be4708c"
    },
    {
        "id": "421bf8d8-ca1a-4642-98a0-587e7f99a416"
    },
    {
        "id": "0cd49a81-7265-49cc-adde-57fefa9a2040"
    },
    {
        "id": "d8437549-0783-4595-91e9-5ae99a07e852"
    },
    {
        "id": "0d71f014-d7c1-4d7e-8082-846a3593f8bf"
    },
    {
        "id": "603b3bf8-178a-4a85-8cc6-781e30e85b79"
    },
    {
        "id": "649f3e96-7763-4401-9bfe-8d154cadf564"
    },
    {
        "id": "eebebc42-1f59-4148-84e1-eb9a28ff9157"
    },
    {
        "id": "22f21781-4dc8-49c9-99ff-0849a43bcfe2"
    },
    {
        "id": "7915bcab-77d2-4a85-9671-b53b45bf3239"
    },
    {
        "id": "1bb719c1-a159-470d-a2f9-4c2ea3f6f1cc"
    },
    {
        "id": "157ba6b1-a708-47b2-b887-7ba64c3ce927"
    },
    {
        "id": "c5a1656d-2e74-452d-9aa4-a0c060e1c7aa"
    },
    {
        "id": "278eb219-da32-44bd-80ed-5ceff3edc4a4"
    },
    {
        "id": "281fb8b5-9b0c-4d7e-b678-40c9fa4851a2"
    },
    {
        "id": "944a687e-11a0-4eb9-86b1-e825f0d26e88"
    },
    {
        "id": "3a4e34e6-cb17-4f30-a5df-79b8ca0fc4f1"
    },
    {
        "id": "009db1ad-fbe3-4974-8019-d54afa4d09a8"
    },
    {
        "id": "4a0f6359-a468-4ad3-9cae-6c6d2b32c508"
    },
    {
        "id": "c18aa61a-d2d0-405a-b3f3-bc338ffde0e5"
    }
];

export class SeedReview1702820002800 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < 2000; i++) {
            const randomIndexA = Math.floor(Math.random() * user.length);
            const randomIndexB = Math.floor(Math.random() * product.length);
            const rating = Math.floor(Math.random() * 6);
            await queryRunner.query(`INSERT INTO "review"("id","userId","productsId","rating","comment")
            VALUES (DEFAULT,'${user[randomIndexA].id}','${product[randomIndexB].id}','${rating}','rating');`)
            await queryRunner.query(`UPDATE "product_entity"
                                    SET "numReviews" =  "numReviews" + 1 
                                    WHERE "id" = '${product[randomIndexB].id}'`)
        }
        const averageRatingByProduct = await queryRunner.query(`
            SELECT "productsId", AVG("rating") AS "averageRating"
            FROM "review"
            GROUP BY "productsId";
            `);
            for (const row of averageRatingByProduct) {
                const productId = row.productsId;
                const averageRating = row.averageRating;
              
                await queryRunner.query(`
                  UPDATE "product_entity"
                  SET "rating" = ${averageRating}
                  WHERE "id" = '${productId}';
                `);
    }
}

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
