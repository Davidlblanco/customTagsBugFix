import { Drawer, DrawerHeader, DrawerCloseButton } from 'vtex.store-drawer'

const MenuMobile = () => (
  <Drawer
    header={
      <DrawerHeader>
        <div className="flex justify-between">
          Menu
        </div>
        <DrawerCloseButton />
      </DrawerHeader>
    }
  >
    <ul>
      <li>Link 1</li>
      <li>Link 2</li>
      <li>Link 3</li>
      <li>Link 4</li>
      <li>Link 5</li>
      <li>
        Link 6
        <ul>
          <li>Link 6.1</li>
          <li>Link 6.2</li>
          <li>Link 6.3</li>
          <li>Link 6.4</li>
        </ul>
      </li>
    </ul>
  </Drawer>
)

export { MenuMobile };