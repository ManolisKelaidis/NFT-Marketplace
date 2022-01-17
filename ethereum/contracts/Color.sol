// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// pragma solidity ^0.4.26;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

// contract Color is ERC721 {
contract Color is ERC721PresetMinterPauserAutoId {
    string[] public colors;
    mapping(string => bool) _colorExists;
    mapping(string => address) _ownerOfColor;

    // constructor() ERC721("Color", "CLR") {
    constructor()
        ERC721PresetMinterPauserAutoId(
            "Color",
            "CLR",
            "https://nfts.plirio.com/nfts/"
        )
    {}

    function mint(string memory _color, uint256 _id) public {
        //Require unique color
        require(!_colorExists[_color]);

        //Add color to the NFTs amd generate the id
        colors.push(_color);

        //Mint the NFT
        _mint(msg.sender, _id);

        //Track the color
        _colorExists[_color] = true;
        _ownerOfColor[_color] = msg.sender;
    }

    //This should be substituted by the IERC721Enumerable https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Enumerable
    // function totalSupply() public view virtual returns (uint256) {
    //     return colors.length;
    // }

    function ownerOfColor(string memory _color) public view returns (address) {
        return _ownerOfColor[_color];
    }
}
