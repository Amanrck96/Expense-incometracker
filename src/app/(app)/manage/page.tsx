import { getCustomers, getItems } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomersTable } from "@/components/data-tables/customers-table";
import { ItemsTable } from "@/components/data-tables/items-table";
import { AddCustomerForm } from "@/components/forms/customer-form";
import { AddItemForm } from "@/components/forms/item-form";

export default async function ManagePage() {
    const [customers, items] = await Promise.all([getCustomers(), getItems()]);

    return (
        <PageHeader
            title="Manage"
            description="Manage your customers and items."
        >
            <Tabs defaultValue="customers">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                        <TabsTrigger value="items">Items</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                        <AddCustomerForm />
                        <AddItemForm />
                    </div>
                </div>
                <TabsContent value="customers">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Customers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CustomersTable data={customers} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="items">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ItemsTable data={items} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </PageHeader>
    );
}
