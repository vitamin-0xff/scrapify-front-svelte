export type _Node =
  | {
      _type: "element"
      name: string
      selectorContent: string
      type: "class" | "id"
      children?: _Node[]
    }
  | {
      _type: "text"
      name: string;
      selectorContent: string
      textContent: string
    }
  | {
      _type: "link"
      name: string;
      selectorContent: string
      href: string
      textContent: string
    }


export type _NodeAPI = {
    name: string;
    fullSelector: string;
    isItArray: boolean;
}


  export type TableHeader = {
    key: string
    label: string
    class?: string
  }